import pools from '../database.js';
import { SQL_QUERIES } from './photo_query.js';

export const insertPhoto = async (payload) => {
  await pools.hAIr.query(SQL_QUERIES.INSERT_PHOTO, [
    payload.photoId,
    payload.userId,
    payload.photoURL,
    payload.saved ? payload.saved : false,
    payload.recommended ? payload.recommended : false,
    payload.applied ? payload.applied : false,
    payload.dyed ? payload.dyed : false,
  ]);
};

export const findByPhotoId = async (photId) => {
  const [rows] = await pools.hAIr.query(SQL_QUERIES.FIND_PHOTO_BY_PHOTO_ID, [photId]);
  return rows;
};

export const getSavedPhotoByUserId = async (userId) => {
  const [rows] = await pools.hAIr.query(SQL_QUERIES.GET_SAVED_PHOTO_BY_USER_ID, [userId]);
  return rows;
};

export const getRecommendedPhotoByUserId = async (userId) => {
  const [rows] = await pools.hAIr.query(SQL_QUERIES.GET_RECOMMENDED_PHOTO_BY_USER_ID, [userId]);
  return rows;
};

export const getAppliedPhotoByUserId = async (userId) => {
  const [rows] = await pools.hAIr.query(SQL_QUERIES.GET_APPLIED_PHOTO_BY_USER_ID, [userId]);
  return rows;
};

export const getDyedPhotoByUserId = async (userId) => {
  const [rows] = await pools.hAIr.query(SQL_QUERIES.GET_DYED_PHOTO_BY_USER_ID, [userId]);
  return rows;
};

export const patchSavePhotoURLByPhotoId = async (userId, photoId) => {
  await pools.hAIr.query(SQL_QUERIES.SAVE_PHOTO_BY_PHOTO_ID, [userId, photoId]);
};
