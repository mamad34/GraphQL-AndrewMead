// import myCurrentLocation, { getGreeting, message, name } from "../playground/myModule";
// import myadd, { subtract } from "./math";
// console.log(message);
// console.log(name);
// console.log(myCurrentLocation);
// console.log(getGreeting("kir"));
// console.log(subtract(1, 1), myadd(1, 1));

import { createServer } from "@graphql-yoga/node";
import { loadFile } from "graphql-import-files";
import db from "./db.js";
// import db from "./db";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Post from "./resolvers/Post.js";
import Comment from "./resolvers/Comment.js";
import User from "./resolvers/User.js";

console.log(db);

const typeDefs = loadFile("./src/schema.graphql");
const server = createServer({
  schema: {
    typeDefs,
    resolvers: {
      Query,
      Mutation,
      User,
      Post,
      Comment,
    },
  },
  context: () => {
    console.log("first", db);

    return {
      db,
    };
  },
});

server.start(() => {
  console.log("Server is UP");
});

// grades(parent, args, ctx, info) {
//   return [90, 80, 93];
// },
// add(parent, args, ctx, info) {
//   if (args.numbers.length === 0) {
//     return 0;
//   }
//   return args.numbers.reduce((accumulator, currVal) => {
//     return accumulator + currVal;
//   });
// },
// greeting(parent, args, ctx, info) {
//   if (args.name && args.position) {
//     return `Hello${args.name} you Are my ${args.position}`;
//   } else {
//     return "Hello fuck";
//   }
// },
// title: () => "Fuck This World",
// price: () => 3.99,
// releaseYear: () => 1969,
// rating: () => null,
// inStock: () => true,
