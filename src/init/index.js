import { testAllConnections } from '../utils/db/pool/testConnection.js';

const initServer = async () => {
  try {
    await testAllConnections();
  } catch (err) {
    console.err(err);
    process.exit(1);
  }
};

export default initServer;
