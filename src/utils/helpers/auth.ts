import jwt from 'jsonwebtoken';
import envs from '../../config/global';

const JWT_SECRET = envs.JWT_SECRET;

export const generateToken = (userId): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};
