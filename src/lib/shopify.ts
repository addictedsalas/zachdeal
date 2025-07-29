import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Initialize Shopify Storefront API client
const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2025-01',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

// Type definitions
export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductImage {
  url: string;
  altText: string | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  priceV2: Money;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ProductImage | null;
  images: {
    edges: Array<{
      node: ProductImage;
    }>;
  };
  priceRange: {
    minVariantPrice: Money;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  availableForSale: boolean;
}

// GraphQL Queries
const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          availableForSale
          featuredImage {
            url
            altText
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const COLLECTION_PRODUCTS_QUERY = `
  query getCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            availableForSale
            featuredImage {
              url
              altText
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation createCart {
    cartCreate {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  handle
                  featuredImage {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

const UPDATE_LINE_ITEM_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

const REMOVE_LINE_ITEM_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

// API Functions
export async function getProducts(first: number = 20): Promise<Product[]> {
  try {
    const { data, errors } = await client.request(PRODUCTS_QUERY, {
      variables: { first },
    });

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to fetch products');
    }

    const products = data?.products?.edges?.map((edge: { node: Product }) => edge.node) || [];
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const { data, errors } = await client.request(PRODUCT_BY_HANDLE_QUERY, {
      variables: { handle },
    });

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to fetch product');
    }

    if (!data?.product) {
      return null;
    }

    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function getCollectionProducts(handle: string, first: number = 20): Promise<Product[]> {
  try {
    const { data, errors } = await client.request(COLLECTION_PRODUCTS_QUERY, {
      variables: { handle, first },
    });

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to fetch collection products');
    }

    if (!data?.collection) {
      return [];
    }

    const products = data.collection.products.edges.map((edge: { node: Product }) => edge.node) || [];
    return products;
  } catch (error) {
    console.error('Error fetching collection products:', error);
    throw error;
  }
}

export async function createCart() {
  try {
    const { data, errors } = await client.request(CREATE_CART_MUTATION);

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to create cart');
    }

    // Return the full cart object instead of just id and checkoutUrl
    return data.cartCreate.cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

export async function addLinesToCart(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>) {
  try {
    const { data, errors } = await client.request(ADD_TO_CART_MUTATION, {
      variables: { cartId, lines },
    });

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to add items to cart');
    }

    // Check for user errors
    if (data.cartLinesAdd.userErrors && data.cartLinesAdd.userErrors.length > 0) {
      const errorMessage = data.cartLinesAdd.userErrors[0].message;
      console.error('Shopify user error:', errorMessage);
      
      // Provide more helpful error messages
      if (errorMessage.includes('not found')) {
        throw new Error('This product is not available. It may not be published to the online store.');
      } else if (errorMessage.includes('stock') || errorMessage.includes('available')) {
        throw new Error('This product is out of stock.');
      } else {
        throw new Error(errorMessage);
      }
    }

    // Check if items were actually added
    if (data.cartLinesAdd.cart.totalQuantity === 0) {
      console.warn('No items were added to cart. Product may not be available on this sales channel.');
    }

    return data.cartLinesAdd.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export async function getCart(cartId: string) {
  try {
    const { data, errors } = await client.request(GET_CART_QUERY, {
      variables: { cartId },
    });

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to fetch cart');
    }

    return data.cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

export async function updateLineItem(cartId: string, lineId: string, quantity: number) {
  try {
    const { data, errors } = await client.request(UPDATE_LINE_ITEM_MUTATION, {
      variables: {
        cartId,
        lines: [{ id: lineId, quantity }],
      },
    });

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to update cart item');
    }

    return data.cartLinesUpdate.cart;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
}

export async function removeLineItem(cartId: string, lineId: string) {
  try {
    const { data, errors } = await client.request(REMOVE_LINE_ITEM_MUTATION, {
      variables: {
        cartId,
        lineIds: [lineId],
      },
    });

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to remove cart item');
    }

    return data.cartLinesRemove.cart;
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
}

// Utility function to format price
export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  const numericPrice = parseFloat(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(numericPrice);
}

// Utility function to determine product type from collections
export async function getProductType(handle: string): Promise<'supplement' | 'program' | null> {
  try {
    // Check if product is in supplements collection
    const supplementsCollection = await getCollectionProducts('supplements', 100);
    if (supplementsCollection.some(product => product.handle === handle)) {
      return 'supplement';
    }

    // Check if product is in programs collection
    const programsCollection = await getCollectionProducts('programs', 100);
    if (programsCollection.some(product => product.handle === handle)) {
      return 'program';
    }

    return null;
  } catch (error) {
    console.error('Error determining product type:', error);
    return null;
  }
}
