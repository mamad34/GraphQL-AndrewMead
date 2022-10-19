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
    category:Categorie
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

  input AddCategoryInput{
    name: String
  }

  input UpdateCategoryInput{
    name: String
  }
  input UpdateProductInput{
    name: String
    description:String
    quantity: Int,
    price: Float,
    image: String,
    onSale: Boolean,
  }
  input UpdateReviewInput{
    date: String
    title: String
    comment: String
    rating: Int
  }

  input AddProductInput{
    name: String
    description:String
    quantity: Int,
    price: Float,
    image: String,
    onSale: Boolean,
  }

  input AddReviewInput{
    date: String
    title: String
    comment: String
    rating: Int
  }

  type Mutation{
    addCategory(input:AddCategoryInput): Categorie!
    addProduct(input:AddProductInput):Product!
    addReview(input:AddReviewInput):Review!
    deleteCategory(id:ID!):Boolean!
    deleteProduct(id:ID!):Boolean!
    deleteReview(id:ID!):Boolean!
    updateCategory(id:ID! , input:UpdateCategoryInput):Categorie
    updateProduct(id:ID! , input:UpdateProductInput):Product
    updateReview(id:ID! , input:UpdateReviewInput):Review
  }

`;
module.exports = typeDefs;
