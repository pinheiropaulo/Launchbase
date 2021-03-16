require("dotenv/config");
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: "utf8",
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`,
    },
  },
};
