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

export const ALL_CATEGORIES_QUERY = `{
  category {
    name,
    products {
      id,
      name,
      inStock,
      gallery,
      description,
      category,
      attributes{
        id,
        name,
        type,
        items{
          id,
          displayValue,
          value
        }
      },
      prices {
        currency,
        amount
      },
      brand
    }
  }
}`;

export const product_query = (id) => {
  return `{
    product(id: "${id}"){
      id,
      name,
      inStock,
      gallery,
      description,
      category,
      attributes{
        id,
        name,
        type,
        items{
          id,
          displayValue,
          value
        }
      },
      prices {
        currency,
        amount
      },
      brand
    }
  }`;
};

export const cat_query = (title) => {
  return `{
    category(input: {title: "${title}"}){
      name,
      products {
        id,
        name,
        inStock,
        gallery,
        description,
        category,
        attributes{
          id,
          name,
          type,
          items{
            id,
            displayValue,
            value
          }
        },
        prices {
          currency,
          amount
        },
        brand
      }
    }
  }`;
};
