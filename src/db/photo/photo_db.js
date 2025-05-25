import pools from '../database.js';
import { SQL_QUERIES } from './photo_query.js';

export const insertPhoto = async (photoId, userId, photoURL) => {
  await pools.hAIr.query(SQL_QUERIES.INSERT_PHOTO, [photoId, userId, photoURL]);
};
