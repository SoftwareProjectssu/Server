import {
  PORT,
  HOST,
  JWT_SECRET_KEY,
  DB1_NAME,
  DB1_USER,
  DB1_PASSWORD,
  DB1_HOST,
  DB1_PORT,
  S3_BUCKETNAME,
  S3_REGION,
  S3_ACCESSKEY,
  S3_SECRETKEY,
  AI_PORT,
  AI_HOST,
  AI2_URL,
} from '../constants/env.js';

export const config = {
  server: {
    port: PORT,
    host: HOST,
  },
  auth: {
    secretKey: JWT_SECRET_KEY,
  },
  databases: {
    hAIr: {
      name: DB1_NAME,
      user: DB1_USER,
      password: DB1_PASSWORD,
      host: DB1_HOST,
      port: DB1_PORT,
    },
    S3: {
      bucketName: S3_BUCKETNAME,
      region: S3_REGION,
      accessKeyId: S3_ACCESSKEY,
      secretAccessKey: S3_SECRETKEY,
    },
  },
  AI: {
    PORT: AI_PORT,
    HOST: AI_HOST,
  },
  AI2: {
    URL: AI2_URL,
  },
};
