/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your schema
 */
// Hard coded data for demonstration purposes
const user = {
    id: "1",
    username: "user1",
    email: "user@domain.something",
};
const vehicles = [
    {
        name: "Car",
        numberOfWheels: "FOUR",
        trunkSize: 500, // Example value for Car
    },
    {
        name: "Bike",
        numberOfWheels: "TWO",
        hasBell: true, // Example value for Bike
    },
    {
        name: "toktok",
        numberOfWheels: "THREE",
        isBlack: true, // Example value for Toktok
    },
];

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
        vehicles(_parent, { input }) {
            return vehicles;
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
        owner(pet, __, ctx) {
            // Return the user associated with the pet
            return ctx.user; // Assuming the user is available in context
        },
    },
    User: {
        vehicles(user, __, ctx) {
            // we can call database to get the vehicles for the user
            // For now, we will return the hardcoded vehicles
            return vehicles;
        },
        pets(user, {input}, ctx) {
            // we can call database to get the pets for the user
            return ctx.models.Pet.findMany(input)
             
        },
    },
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
        addVehicle(__, { input }, ctx) {
            // Log the input to see what is being passed
            console.log("Adding vehicle with input:", input);
            // Here you would typically call a method to add the vehicle to database
            // For now, we will just return a mock object
            if (input.numberOfWheels === "FOUR") {
                return {
                    name: input.name,
                    numberOfWheels: input.numberOfWheels,
                    trunkSize: 500, // Example value for Car
                };
            } else if (input.numberOfWheels === "TWO") {
                return {
                    name: input.name,
                    numberOfWheels: input.numberOfWheels,
                    hasBell: true, // Example value for Bike
                };
            } else if (input.numberOfWheels === "THREE") {
                return {
                    name: input.name,
                    numberOfWheels: input.numberOfWheels,
                    isBlack: true, // Example value for Toktok
                };
            }
        },
    },
    Vehicle: {
        __resolveType(vehicle) {
            if (vehicle.numberOfWheels === "FOUR") {
                return "Car";
            }
            if (vehicle.numberOfWheels === "TWO") {
                return "Bike";
            }
            if (vehicle.numberOfWheels === "THREE") {
                return "Toktok";
            }
            return null; // GraphQL will throw an error if no type matches
        },
    },
    Car: {
        user(car, __, ctx) {
            //
            return user; // Return the user object for Car
        },
    },
    Bike: {
        user(bike, __, ctx) {
            //
            return user; // Return the user object for Bike
        },
    },
    Toktok: {
        user(toktok, __, ctx) {
            //
            return user; // Return the user object for Toktok
        },
    },
};
