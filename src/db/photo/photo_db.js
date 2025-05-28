import pools from '../database.js';
import { SQL_QUERIES } from './photo_query.js';

export const insertPhoto = async (payload) => {
  await pools.hAIr.query(SQL_QUERIES.INSERT_PHOTO, [
    payload.photoId,
    payload.userId,
    payload.photoURL,
    payload.saved ? payload.saved : 0,
    payload.recommended ? payload.recommended : 0,
    payload.applied ? payload.applied : 0,
    payload.dyed ? payload.dyed : 0,
  ]);
};

export const findByPhotoId = async (photId) => {
  const [rows] = await pools.hAIr.query(SQL_QUERIES.FIND_PHOTO_BY_ID, [photId]);
  return rows;
};
