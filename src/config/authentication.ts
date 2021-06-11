import jwt from 'jsonwebtoken';

const generateToken = (id: number, profile: number): string => {
  const privateKey = process.env.JWT_SECRET || '';
  const token = jwt.sign({ id, profile }, privateKey, {
    // expiresIn: 60 * 60 * 24, // 1 day
  });
  return token;
};

export { generateToken };
