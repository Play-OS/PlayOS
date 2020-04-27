module.exports = {
    client: {
        service: {
            name: "localhost",
            url: "http://localhost:4000/graphql"
        },
        skipSSLValidation: true,
        excludes: ["node_modules/**/*"],
        includes: ["src/**/*.{ts,gql,tsx,js,jsx,graphql}"]
    }
};
