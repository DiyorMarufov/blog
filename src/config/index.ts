import { config } from 'dotenv';

config();

export default {
  API_PORT: Number(process.env.API_PORT),
  DB_URL: String(process.env.DB_URL),
};
