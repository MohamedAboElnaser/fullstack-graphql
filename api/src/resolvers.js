/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your schema
 */

module.exports = {
    Query: {
        /**
         *
         * @param {*} _parent This is the parent object , not used here
         * @param {*} _args  These are the arguments passed to the query from the client
         * @param {*} _context this is the context object (Shared data for all resolvers)
         *                    can be used to access shared data like database connections
         *                     or authentication information.
         * @param {*} _info This is the info object from the query
         * @returns
         */
        pets(_parent, { input }, { models }, _info) {
            console.log("input:", input);
            return models.Pet.findMany(input);
        },
    },
    Pet: {
        img(pet) {
            return pet.type === "DOG"
                ? "https://placedog.net/300/300"
                : "http://placekitten.com/300/300";
        },
        // Assuming createdAt and isAdopted are not in the database, we can provide default values
        createdAt() {
            return Date().toString(); // Return current timestamp as string
        },
        isAdopted() {
            return false; // Default value for isAdopted
        },
    },
    // User: {},
    Mutation: {
        addPet(_parent, { input }, ctx) {
            // Log the input to see what is being passed
            console.log("Adding pet with input:", input);
            // Call the create method from the Pet model to add a new pet
            return ctx.models.Pet.create({
                name: input.name,
                type: input.type,
            });
        },
    },
};
