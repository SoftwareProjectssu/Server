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

export const S3_BUCKETNAME = process.env.S3_BUCKET_NAME;
export const S3_REGION = process.env.S3_REGION;
export const S3_ACCESSKEY = process.env.S3_ACCESS_KEY_ID;
export const S3_SECRETKEY = process.env.S3_SECRET_ACCESS_KEY;

export const AI_PORT = process.env.AI_SERVER_PORT;
export const AI_HOST = process.env.AI_SERVER_HOST;
