export const SQL_QUERIES = {
  INSERT_PHOTO:
    'INSERT INTO Photos (photoId, userId, photoURL, saved, recommended, applied, dyed) VALUES (?, ?, ?, ?, ?, ?, ?)',
  FIND_PHOTO_BY_ID: 'SELECT * FROM Photos WHERE photoId=?',
};
