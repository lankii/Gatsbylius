module.exports = ({ actions }, options) => {
  const { createTypes } = actions;

  const typeDefs = `
    ${options.attributes || ""}

    type Taxons {
      main: String
      others: [String]
    }

    type Price {
      currency: String!
      current: Int!
    }

    type Variant {
      name: String!,
      price: Price!,
      code: String!,
    }

    type Product implements Node @dontInfer {
      code: String!
      slug: String!
      name: String!
      description: String
      shortDescription: String
      channelCode: String!
      averageRating: Int!
      localImage: File
      taxons: Taxons
      ${options.attributes ? "attributes: Attributes" : ""}
      variants: [Variant]!
    }

    type Category implements Node @dontInfer {
      code: String!
      slug: String!
      name: String!
      description: String
      position: Int
      subcategories: [Category]!
      parentCategory: Category
      products: [Product]!
      level: Int!
      localImage: File
    }
  `;

  createTypes(typeDefs);
};