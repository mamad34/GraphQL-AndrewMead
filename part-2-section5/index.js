import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const typeDefs = require("./schema.js");
const { categories, products, reviews } = require("./db.js");
const Query = require("./resolvers/Query.js");
const { Categorie } = require("./resolvers/Categorie.js");
const { Product } = require("./resolvers/Product.js");
const resolvers = {
  Query: Query.Query,
  Categorie,
  Product,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const initializeServer = async () => {
  const { url } = await startStandaloneServer(server, {
    context: ({ req, res }) => {
      return {
        categories,
        products,
        reviews,
      };
    },
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

initializeServer();
