import dotenv from 'dotenv';

dotenv.config();

const envs = {
  PORT: process.env.PORT,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default envs;
