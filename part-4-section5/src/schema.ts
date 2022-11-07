import { gql} from "apollo-server"
export const typeDefs = gql`
type Query {
    posts:[Post!]!
}

type Mutation{
    postCreate(post:PostInput!):PostPayload!
    postUpdate(postId:ID!,post:PostInput!):PostPayload
    postDelete(postId:ID!):PostPayload!
    signup(credentials:CredentalsInput!,name:String!,bio:String!):AuthPayload!
    signin(credentials:CredentalsInput!):AuthPayload!
}

type Post {
    id:ID!
    title:String!
    content:String!
    createdAt:String!
    published:Boolean!
    user: User!
}

type User {
    id:ID!
    name:String!
    email:String!
    profile:Profile!
    posts:[Post!]!
}
type Profile{
    id:ID!
    bio:String!
    user:User! 
}

type userError{
    message:String!
}

type PostPayload{
    userErrors: [userError!]!
    post:Post
}

type AuthPayload{
    userErrors:[userError!]!
    token:String!
}

input PostInput {
    title:String
    content:String
}

input CredentalsInput{
    email:String!
    password:String!
}

`
 