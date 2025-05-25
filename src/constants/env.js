import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const DB1_NAME = process.env.DB1_NAME;
export const DB1_USER = process.env.DB1_USER;
export const DB1_PASSWORD = process.env.DB1_PASSWORD;
export const DB1_HOST = process.env.DB1_HOST;
export const DB1_PORT = process.env.DB1_PORT;
