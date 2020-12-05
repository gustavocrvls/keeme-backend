import jwt from 'jsonwebtoken';

const privateKey = process.env.JWT_SECRET || '';

const generateToken = (id: string) => {
  const token = jwt.sign({ id }, privateKey, {
    expiresIn: 3600
  });
  return token;
}

export { generateToken };