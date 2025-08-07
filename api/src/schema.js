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
    interface Vehicle {
        name: String!
        numberOfWheels: NumberOfWheels!
    }

    type Car implements Vehicle {
        name: String!
        numberOfWheels: NumberOfWheels!
        trunkSize: Int!
    }

    type Bike implements Vehicle {
        name: String!
        numberOfWheels: NumberOfWheels!
        hasBell: Boolean!
    }

    type Toktok implements Vehicle {
        name: String!
        numberOfWheels: NumberOfWheels!
        isBlack: Boolean!
    }

    input PetInput {
        name: String
        type: PetType
    }

    input vehicleInput {
        name: String!
        numberOfWheels: NumberOfWheels!
    }
    type Query {
        pets(input: PetInput): [Pet!]
        vehicles(input: vehicleInput): [Vehicle!]!
    }

    type Mutation {
        addPet(input: PetInput): Pet!
        addVehicle(input: vehicleInput): Vehicle!
    }

    enum PetType {
        DOG
        CAT
        RABBIT
    }

    enum NumberOfWheels {
        TWO
        THREE
        FOUR
    }
`;

module.exports = typeDefs;
