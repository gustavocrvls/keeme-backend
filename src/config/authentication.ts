import jwt from 'jsonwebtoken';

const privateKey = process.env.JWT_SECRET || '';

const generateToken = (id: number, perfil: number): string => {
  const token = jwt.sign({ id, perfil }, privateKey, {
    expiresIn: 3600,
  });
  return token;
};

// eslint-disable-next-line import/prefer-default-export
export { generateToken };
