import { findByPhotoId } from '../../db/photo/photo_db.js';

export const photoDyeHandler = async (req, res) => {
  try {
    const { photoID } = req;
    findByPhotoId(photoID);
  } catch (err) {
    return res.stauts(500).json({ message: '서버 오류에요' });
  }
};
