const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
    type User {
        id: ID
        username: String
    }

    """
    Description in this space will be available in the GraphQL Playground
    So you can use it to document your schema or provide additional context
    """
    type Pet {
        id: ID!
        name: String
        type: String
        createdAt: String
        isAdopted: Boolean
        img: String
    }

    input PetInput {
        name: String
        type: PetType
    }

    type Query {
        pets(input: PetInput): [Pet!]
    }

    type Mutation {
        addPet(input: PetInput): Pet!
    }

    enum PetType {
        DOG
        CAT
        RABBIT
    }
`;

module.exports = typeDefs;
