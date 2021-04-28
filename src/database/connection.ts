import { createConnection } from 'typeorm';

export function startDatabase(): void {
  createConnection().then(connection => {
    if (connection.isConnected) console.log('📦 Database connected!');
  });
}
