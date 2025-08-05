/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your schema
 */

module.exports = {
    Query: {
        /**
         *
         * @param {*} _parent This is the parent object, not used here
         * @param {*} _args  These are the arguments passed to the query from the client
         * @param {*} _context this is the context object (Shared data for all resolvers)
         *                    can be used to access shared data like database connections
         *                     or authentication information.
         * @param {*} _info This is the info object from the query
         * @returns
         */
        pets(_parent, _args, { models }, _info) {
            return models.Pet.findMany({});
        },
    },
    // Mutation: {},
    // Pet: {
    //     img(pet) {
    //         return pet.type === "DOG"
    //             ? "https://placedog.net/300/300"
    //             : "http://placekitten.com/300/300";
    //     },
    // },
    // User: {},
};
