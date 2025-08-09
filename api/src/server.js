const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { models, db } = require("./db");
const user = models.User.findOne(); // Fetch the user from the database
const server = new ApolloServer({
    context() {
        return {
            // Whatever returned here will be available in all resolvers
            models,
            user, // Add user to context so it can be accessed in all resolvers
        };
    },
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
