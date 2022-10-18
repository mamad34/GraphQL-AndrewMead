const typeDefs = `#graphql
  type Query {
    books: String!
    numberOfAnimals:Int!
    price:Float!
    hello:[String]
    products(filter:ProductFilterInput):[Product!]!
    product(id:ID!):Product!
    categories:[Categorie!]!
    categorie(id:ID!):Categorie!
  }
  type Product{
    id:ID!
    name:String!
    description:String!
    quantity:Int!
    price:Float!
    onSale:Boolean
    img:String!
    category:Categorie!
    reviews:[Review!]!
  }
  type Categorie{
    id: ID!,
    name: String!,
    products:[Product!]!
  }

  type Review{
    id:ID!
    date:String!
    title:String!
    comment:String!
    rating:Int!
  }

  input ProductFilterInput {
    onSale:Boolean
    avgRating:Int
  }

`;
module.exports = typeDefs;
