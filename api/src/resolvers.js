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
        pets(_parent, _args, { models }, _info) {
            return [
                { id: 1, name: "meshmes" },
                { id: 2, name: "soltan" },
            ];
        },
    },
    // Mutation: {},
    Pet: {
        img(pet) {
            return pet.type === "DOG"
                ? "https://placedog.net/300/300"
                : "http://placekitten.com/300/300";
        },
        // This resolver is used to resolve the id field of the Pet type
        // this means that resolver is executed after the pets query
        id(pet) {
            // This resolver will override value of id field in Pet type
            console.log("id resolver called for pet:", pet);
            return `pet-${pet.id}`;
        },
    },
    // User: {},
};
