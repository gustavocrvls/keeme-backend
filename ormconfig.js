module.exports = {
  type: 'mysql',
  logging: true,
  synchronize: false, // if is true, the database will be reseted on each start, be carefull
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['./src/database/migrations/*'],
  entities: ['./src/entities/*'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
