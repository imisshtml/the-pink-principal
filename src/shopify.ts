import Client from 'shopify-buy';

// Initialize the Shopify Buy SDK client
// Replace with actual credentials from environment variables in production
export const shopifyClient = Client.buildClient({
  domain: 'n0wkdr-rf.myshopify.com',
  storefrontAccessToken: '71728617b219c4a7f01a8591109af7de',
  apiVersion: '2024-01'
});

// A lightweight cart state manager for UI purposes
export const cartState = {
  items: [] as any[],
  isOpen: false,

  toggleCart() {
    this.isOpen = !this.isOpen;
    document.dispatchEvent(new CustomEvent('cart:toggled', { detail: this.isOpen }));
  },

  addItem(product: any) {
    this.items.push(product);
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: this.items }));
    this.isOpen = true;
    document.dispatchEvent(new CustomEvent('cart:toggled', { detail: this.isOpen }));
  },

  removeItem(index: number) {
    this.items.splice(index, 1);
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: this.items }));
  }
};
