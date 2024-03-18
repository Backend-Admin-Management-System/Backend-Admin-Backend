module.exports = {
    jwtConfig: {
        secret: "shhhhhha3red-secret",
        audience: "apitester",
        issuer: "issuer",
        algorithms: ["HS256"],
        expiresIn: '2h'
    },
    mysqlConfig: {
        host: "127.0.0.1",
        user: "root",
        password: "1234567",
        database: "workshop",
      },
    bcryptConfig: {
        salt:"$2b$10$ig9HBJNu6OgmwSnbPn/jWu"
    }
};
