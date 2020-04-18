// const config = {
//     development: {
//         dbConnectionString: 'mongodb+srv://msciborski:VisuaL!123@vocabuilder-j8byi.azure.mongodb.net/test?retryWrites=true&w=majority',
//         translateAPIKey: 'AIzaSyAXwml8CUNh6dOl-7keuFgDTnoBKMCeJC8',
//         jwksUri: 'https://bookmemobi.eu.auth0.com/.well-known/jwks.json',
//         audience: 'vocabuilder',
//         issuer: 'https://bookmemobi.eu.auth0.com/',
//     }

// }

// module.exports = config;

export const config = {
    development: {
        dbConnectionString: "mongodb+srv://msciborski:VisuaL!123@vocabuilder-j8byi.azure.mongodb.net/test?retryWrites=true&w=majority",
        authorization: {
            jwksUri: "",
            audience: "",
            issuer: "",
            secret: "vWcnpGsCDwMbPrDDbwBVdFW6iJl9C2JD",
        },
        translation: {
            translateAPIKey: "AIzaSyAXwml8CUNh6dOl-7keuFgDTnoBKMCeJC8",
        }
    }
}
