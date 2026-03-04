const Client = require('shopify-buy');

const client = Client.buildClient({
  domain: 'n0wkdr-rf.myshopify.com',
  storefrontAccessToken: '71728617b219c4a7f01a8591109af7de',
  apiVersion: '2024-01' // or 2024-01
});

client.product.fetchAll().then((products) => {
  console.log(JSON.stringify(products, null, 2));
}).catch((err) => {
  console.error(err);
});
