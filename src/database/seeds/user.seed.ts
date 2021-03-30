import crypto from 'crypto';

const password = crypto
  .createHash('md5')
  .update(process.env.ADMIN_PASSWORD || 'password')
  .digest('hex');

export const UserSeed = [
  {
    name: 'Administrador',
    cpf: '00000000000',
    email: 'admin@admin.com',
    username: 'admin',
    profile: 1,
    password,
  },
];
