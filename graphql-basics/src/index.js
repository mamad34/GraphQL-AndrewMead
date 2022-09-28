// import myCurrentLocation, { getGreeting, message, name } from "../playground/myModule";
// import myadd, { subtract } from "./math";
// console.log(message);
// console.log(name);
// console.log(myCurrentLocation);
// console.log(getGreeting("kir"));
// console.log(subtract(1, 1), myadd(1, 1));

import { createServer } from "@graphql-yoga/node";
import { v4 as uuidv4 } from "uuid";
//Demo User Data
const myUsers = [
  {
    id: "1",
    name: "mamad",
    email: "mamad@dick.com",
    age: 24,
  },
  {
    id: "2",
    name: "johnny",
    email: "johnny@dick.com",
  },
  {
    id: "3",
    name: "Alexis",
    email: "Alexis@dick.com",
    age: 69,
  },
];

const myPosts = [
  {
    id: "1",
    title: "Do Ebi",
    body: "How we Can Fuck ebi in the ass",
    published: true,
    author: "1",
    comment: "1",
  },
  {
    id: "2",
    title: "Do sisi",
    body: "How we Can Fuck sisi in the ass",
    published: false,
    author: "1",
    comment: "2",
  },
  {
    id: "3",
    title: "Fart inside Ebis mouth",
    body: "the fart is very good thing and very soft",
    published: true,
    author: "2",
    comment: "3",
  },
];

const myComments = [
  { id: "1", text: "This is first Comment", author: "1", post: "3" },
  {
    id: "2",
    text: "This is second Comment",
    author: "1",
    post: "1",
  },
  {
    id: "3",
    text: "This is third Comment",
    author: "2",
    post: "2",
  },
  {
    id: "4",
    text: "This is fourth Comment",
    author: "3",
    post: "3",
  },
];

const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        # title: String
        # price: Float
        # releaseYear: Int
        # rating: Float
        # inStock: Boolean
        # add(numbers: [Float!]): Float!
        # greeting(name: String, position: String): String!
        # grades: [Int!]!
        me: User
        post: Post
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
      }

      type Mutation {
        createUser(name: String, email: String!, age: Int): User!
      }

      type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
      }
      type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
      }
      type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
      }
    `,
    resolvers: {
      Query: {
        comments(parent, args, ctx, info) {
          return myComments;
        },
        users(parent, args, ctx, info) {
          if (!args.query) {
            return myUsers;
          }
          return myUsers.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
          });
        },
        me() {
          return {
            id: "123456789",
            name: "puss",
            email: "hellp@hello.com",
            // age: 21455,
          };
        },
        posts(parent, args, ctx, info) {
          if (!args.query) {
            console.log("ad");
            return myPosts;
          }
          return myPosts.filter((post) => {
            const isTitleMatch = post.title
              .toLowerCase()
              .includes(args.query.toLowerCase());
            const isBodyMatch = post.body
              .toLowerCase()
              .includes(args.query.toLowerCase());
            return isTitleMatch || isBodyMatch;
          });
        },
      },
      Mutation: {
        createUser(parent, args, cxt, info) {
          console.log("args", args);
        },
      },
      Post: {
        author(parent, args, ctx, info) {
          console.log(parent);
          return myUsers.find((user) => {
            return user.id === parent.author;
          });
        },
        comments(parent, args, ctx, info) {
          return myComments.filter((comment) => {
            return comment.post === parent.id;
          });
        },
      },
      User: {
        posts(parent, args, ctx, info) {
          return myPosts.filter((post) => {
            return post.author === parent.id;
          });
        },
        comments(parent, args, ctx, info) {
          return myComments.filter((comment) => {
            return comment.author === parent.id;
          });
        },
      },
      Comment: {
        author(parent, args, ctx, info) {
          return myUsers.find((user) => {
            return user.id === parent.author;
          });
        },
        post(parent, args, ctx, info) {
          return myPosts.find((post) => {
            return post.id === parent.post;
          });
        },
      },
    },
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
