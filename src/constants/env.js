import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
