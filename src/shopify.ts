export interface ShopifyVariantOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number | null;
  availableForSale: boolean;
  selectedOptions: ShopifyVariantOption[];
  image?: string;
}

export interface ShopifyProduct {
  id: string; // The product GID
  variantId: string; // The variant GID needed for checkout
  title: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  images: string[];
  productType: string;
  handle: string;
  description: string;
  variants: ShopifyVariant[];
}

const DOMAIN = 'n0wkdr-rf.myshopify.com';
const TOKEN = '71728617b219c4a7f01a8591109af7de';
const API_VERSION = '2024-01';
const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;
const CHECKOUT_DOMAIN_OVERRIDE = (import.meta.env.VITE_SHOPIFY_CHECKOUT_DOMAIN as string | undefined)?.trim();

let cachedCheckoutDomain: string | null = null;
let checkoutDomainRequest: Promise<string | null> | null = null;

type StorefrontError = { message?: string };

async function storefrontRequest<TData>(query: string, variables?: Record<string, unknown>): Promise<TData> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    throw new Error(`Shopify request failed (${response.status})`);
  }

  const payload = await response.json();
  const errors = (payload?.errors || []) as StorefrontError[];
  if (errors.length > 0) {
    const message = errors.map((err) => err.message).filter(Boolean).join(', ');
    throw new Error(message || 'Shopify GraphQL error');
  }

  return payload.data as TData;
}

function normalizeHost(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  try {
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return new URL(trimmed).host;
    }
    return new URL(`https://${trimmed}`).host;
  } catch {
    return trimmed.replace(/^https?:\/\//, '').replace(/\/+$/, '');
  }
}

async function getCheckoutDomain(): Promise<string | null> {
  if (CHECKOUT_DOMAIN_OVERRIDE) {
    return normalizeHost(CHECKOUT_DOMAIN_OVERRIDE) || null;
  }

  if (cachedCheckoutDomain !== null) {
    return cachedCheckoutDomain;
  }

  if (checkoutDomainRequest) {
    return checkoutDomainRequest;
  }

  checkoutDomainRequest = (async () => {
    try {
      const data = await storefrontRequest<{ shop?: { primaryDomain?: { host?: string | null; url?: string | null } } }>(`
        {
          shop {
            primaryDomain {
              host
              url
            }
          }
        }
      `);
      const hostFromApi = data?.shop?.primaryDomain?.host || data?.shop?.primaryDomain?.url || '';
      cachedCheckoutDomain = normalizeHost(hostFromApi) || null;
      return cachedCheckoutDomain;
    } catch {
      cachedCheckoutDomain = null;
      return null;
    } finally {
      checkoutDomainRequest = null;
    }
  })();

  return checkoutDomainRequest;
}

export async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            productType
            variants(first: 25) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                  }
                  price { amount }
                  compareAtPrice { amount }
                }
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await storefrontRequest<{ products: { edges: Array<{ node: any }> } }>(query);
    return data.products.edges.map(({ node }) => {
      const rawProductType = (node.productType || '').trim().toLowerCase();
      const looksLikeHair = node.handle?.toLowerCase().includes('hair') || node.title?.toLowerCase().includes('hair');
      const normalizedProductType = rawProductType || (looksLikeHair ? 'hair' : 'makeup');
      const variants: ShopifyVariant[] = node.variants.edges
        .map(({ node: variantNode }: any) => ({
          id: variantNode.id,
          title: variantNode.title || 'Default',
          availableForSale: Boolean(variantNode.availableForSale),
          selectedOptions: (variantNode.selectedOptions || []).map((opt: any) => ({
            name: opt.name,
            value: opt.value
          })),
          image: variantNode?.image?.url || undefined,
          price: parseFloat(variantNode?.price?.amount || '0'),
          compareAtPrice: variantNode?.compareAtPrice?.amount ? parseFloat(variantNode.compareAtPrice.amount) : null
        }))
        .filter((variant: ShopifyVariant) => variant.availableForSale);
      const fallbackVariants = variants.length > 0 ? variants : node.variants.edges
        .map(({ node: variantNode }: any) => ({
          id: variantNode.id,
          title: variantNode.title || 'Default',
          availableForSale: Boolean(variantNode.availableForSale),
          selectedOptions: (variantNode.selectedOptions || []).map((opt: any) => ({
            name: opt.name,
            value: opt.value
          })),
          image: variantNode?.image?.url || undefined,
          price: parseFloat(variantNode?.price?.amount || '0'),
          compareAtPrice: variantNode?.compareAtPrice?.amount ? parseFloat(variantNode.compareAtPrice.amount) : null
        }));
      const variant = fallbackVariants[0];
      return {
        id: node.id,
        variantId: variant?.id || '',
        title: node.title,
        price: variant?.price ?? 0,
        compareAtPrice: variant?.compareAtPrice ?? null,
        image: node.images.edges[0]?.node?.url || '',
        images: node.images.edges.map((img: any) => img.node.url),
        productType: normalizedProductType,
        handle: node.handle,
        description: node.descriptionHtml || node.description || '',
        variants: fallbackVariants
      };
    });
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return [];
  }
}

export async function createCheckoutUrl(lineItems: { variantId: string, quantity: number }[]): Promise<string> {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          checkoutUrl
        }
        userErrors {
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
      }))
    }
  };

  const data = await storefrontRequest<{
    cartCreate?: {
      cart?: { checkoutUrl?: string };
      userErrors?: StorefrontError[];
    };
  }>(query, variables);

  const userErrors = data?.cartCreate?.userErrors || [];
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((err) => err.message).filter(Boolean).join(', ') || 'Could not create checkout URL');
  }

  if (data?.cartCreate?.cart?.checkoutUrl) {
    const rawCheckoutUrl = data.cartCreate.cart.checkoutUrl;
    const checkoutDomain = await getCheckoutDomain();
    if (!checkoutDomain) return rawCheckoutUrl;

    try {
      const parsedUrl = new URL(rawCheckoutUrl);
      parsedUrl.host = checkoutDomain;
      return parsedUrl.toString();
    } catch {
      return rawCheckoutUrl;
    }
  }

  throw new Error('Could not create checkout URL');
}

export interface CartItem extends ShopifyProduct {
  quantity: number;
}

export const cartState = {
  items: [] as CartItem[],
  isOpen: false,

  toggleCart() {
    this.isOpen = !this.isOpen;
    document.dispatchEvent(new CustomEvent('cart:toggled', { detail: this.isOpen }));
  },

  addItem(product: ShopifyProduct) {
    const existingItem = this.items.find(item => item.variantId === product.variantId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: this.items }));
    this.isOpen = true;
    document.dispatchEvent(new CustomEvent('cart:toggled', { detail: this.isOpen }));
  },

  removeItem(index: number) {
    this.items.splice(index, 1);
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: this.items }));
  }
};
