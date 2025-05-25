export const SQL_QUERIES = {
  FIND_USER_BY_KAKAOID: 'SELECT * FROM Users WHERE kakaoId = ?',
  INSERT_USER:
    'INSERT INTO Users (uuid, kakaoId, nickname, faceType, sex, repPhotoId) VALUES (?, ?, ?, ?, ?, ?)',
};
