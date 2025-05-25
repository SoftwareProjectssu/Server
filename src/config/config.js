import {
  PORT,
  HOST,
  JWT_SECRET_KEY,
  DB1_NAME,
  DB1_USER,
  DB1_PASSWORD,
  DB1_HOST,
  DB1_PORT,
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
  },
};
