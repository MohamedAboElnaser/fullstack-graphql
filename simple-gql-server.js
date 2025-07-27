const gqt = require("graphql-tag");
const { ApolloServer } = require("apollo-server");
// This is a simple GraphQL server using graphql-tag to define the schema
// At minimum, schema must have at least one query type so that it can be executed from the client

/** This is the schema  */
const typeDefs = gqt`
    type User  {
        email: String!
        name: String
        friends: [User]!
    }

    type Query {
        myData: User!
    }
`;

/**
 * This is the resolver for the schema
 */

const resolvers = {
    Query: {
        // Must be the same as the Query type in the schema
        myData() {
            return {
                email: "user@domain.something",
                name: "User Name",
                friends: [],
            };
        },
    },
};

// Create the Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server
    .listen(3000)
    .then(() => console.log("Server is running on http://localhost:3000"));
