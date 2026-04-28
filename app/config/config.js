require("dotenv").config();

const useSshTunnel = !!process.env.SSH_HOST;

const productionConfig = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql",
};

if (useSshTunnel) {
    productionConfig.host = '127.0.0.1';
    productionConfig.port = 3307;
} else {
    productionConfig.host = process.env.DB_HOST;
    productionConfig.port = process.env.DB_PORT;
}

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT,
        dialect: "mysql",
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST || "127.0.0.1",
        port: useSshTunnel ? 3307 : 3306,
        dialect: "mysql",
    },
    production: productionConfig,
};
