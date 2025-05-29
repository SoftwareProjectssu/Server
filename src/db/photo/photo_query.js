export const SQL_QUERIES = {
  INSERT_PHOTO:
    'INSERT INTO Photos (photoId, userId, photoURL, saved, recommended, applied, dyed) VALUES (?, ?, ?, ?, ?, ?, ?)',
  FIND_PHOTO_BY_PHOTO_ID: 'SELECT * FROM Photos WHERE photoId=?',
  GET_SAVED_PHOTO_BY_USER_ID: 'SELECT * FROM Photos WHERE userId=? and saved=true',
  GET_RECOMMENDED_PHOTO_BY_USER_ID: 'SELECT * FROM Photos WHERE userId=? and recommended=true',
  GET_APPLIED_PHOTO_BY_USER_ID: 'SELECT * FROM Photos WHERE userId=? and applied=true',
  GET_DYED_PHOTO_BY_USER_ID: 'SELECT * FROM Photos WHERE userId=? and dyed=true',
  SAVE_PHOTO_BY_PHOTO_ID: 'UPDATE Photos SET saved=true WHERE userId=? and photoId=?',
};
