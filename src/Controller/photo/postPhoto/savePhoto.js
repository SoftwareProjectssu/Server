import { patchSavePhotoURLByPhotoId } from '../../../db/photo/photo_db.js';

export const savePhotoHandler = async (req, res) => {
  try {
    const userId = req.uuid;
    const photoId = req.body.photoId;
    if (!photoId) {
      return res.status(400).json({ message: 'photoId 누락' });
    }
    await patchSavePhotoURLByPhotoId(userId, photoId);
  } catch (err) {
    return res.status(500).json({ message: '서버 오류에요' });
  }
};
