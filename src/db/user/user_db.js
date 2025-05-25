import pools from '../database.js';
import { SQL_QUERIES } from './user_query.js';

export const findUserByKakaoId = async (kakaoId) => {
  const [rows] = await pools.hAIr.query(SQL_QUERIES.FIND_USER_BY_KAKAOID, [kakaoId]);
  return rows;
};

export const insertUser = async (payload) => {
  await pools.hAIr.query(SQL_QUERIES.INSERT_USER, [
    payload.uuid,
    payload.kakaoId,
    payload.nickname,
    payload.faceType,
    payload.sex,
    payload.photoUrl,
  ]);
};
