import crypto from 'crypto';

const senha = crypto
  .createHash('md5')
  .update(process.env.ADMIN_PASSWORD || 'password')
  .digest('hex');

const UsuarioSeed = [
  {
    nome: 'Administrador',
    username: 'admin',
    cpf: '00000000000',
    email: 'admin@admin.com',
    perfil: 1,
    senha,
  },
];

export default UsuarioSeed;
