import jwt from 'jsonwebtoken';

const generateToken = (id: number, profile: number): string => {
  const privateKey = process.env.JWT_SECRET || '';
  const token = jwt.sign({ id, profile }, privateKey, {
    // expiresIn: 3600,
  });
  return token;
};

// eslint-disable-next-line import/prefer-default-export
export { generateToken };
