require('dotenv/config');

const developmentConfig = {
  type: 'mysql',
  logging: true,
  synchronize: false, // if is true, the database will be reseted on each start, be carefull
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/entities/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

const productionConfig = {
  type: 'mysql',
  logging: true,
  synchronize: false, // if is true, the database will be reseted on each start, be carefull
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['./dist/database/migrations/*.js'],
  entities: ['./dist/entities/*.js'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

module.exports =
  process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig;
