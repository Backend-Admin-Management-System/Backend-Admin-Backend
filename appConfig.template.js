module.exports = {
    jwtConfig: {
        secret: "shhhhhha3red-secret",
        audience: "apitester",
        issuer: "issuer",
        algorithms: ["HS256"],
        expiresIn: '2h'
    },
    mysqlConfig: {
        host: "127.0.0.1",    // Change this to your MySQL host,normally you don't need to change this.
        user: "root",         // Change this to your MySQL user,normally you don't need to change this.
        password: "1234567",  // Change this to your MySQL password
        database: "workshop", // better not to change this, we want to use the same database name.
    },
    bcryptConfig: {
        salt: "$2b$10$ig9HBJNu6OgmwSnbPn/jWu"
    }
};
