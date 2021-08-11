export const CURRENCY_QUERY = `{currencies}`;
export const CATEGORIES_QUERY = `{categories {name}}`;
export const PRODUCTS_QUERY = `{
    categories {
      name
      products {
        id, 
        name,
        inStock,
        gallery,
        description,
        category,
        brand,
        attributes {
          id,
          name,
          type,
          items {
            id,
            value,
            displayValue
          }
        }
        prices {
          currency,
          amount
        }
      }
    }
  }`;
  