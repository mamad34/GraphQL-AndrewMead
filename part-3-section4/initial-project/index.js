const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    featureSet: GroupFeatureSet
    hasCar(id:ID!):Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    image: Image!
    description: String!
  }
  type Image {
    id: ID!
    url: String!
  }
  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeperately: Boolean!
  }
  type GroupFeatures {
    feature: GroupFeatureFields!
  }
  enum GroupFeatureFields{
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLUNDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }
  type Mutation{
    groupDelete(groupId:ID!)
    groupPublish(groupId:ID!)
    groupUnpublish(groupId:ID!)
    groupAddCars(groupId:ID!,carID:ID!)
    groupRemoveCars(groupId:ID!,carID:ID!)
    groupCreate(
      groupInput:GroupInput!
    )
    groupUpdate(
      groupId:ID!
      name:String
      groupInput:GroupInput!
    ):GroupUpdatePayload
  }

type GroupUpdatePayload{
  userErrors:[UserErrors]!
  group: Group
}

type UserErrors{
  message: String!
  fileld:[String!]!
}

  input GroupInput {
    name:String
      image:ImageInput
      description:String
      featureSet:GroupFeatureSet
  }
  input ImageInput {
    url:String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
