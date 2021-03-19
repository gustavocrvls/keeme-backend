import { createConnection } from 'typeorm';

createConnection().then(connection => {
  if (connection.isConnected) console.log('📦 Database connected!');
});
