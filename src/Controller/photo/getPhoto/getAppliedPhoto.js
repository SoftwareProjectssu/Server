import { getAppliedPhotoByUserId } from '../../../db/photo/photo_db.js';

export const getAppliedPhotoHandler = async (req, res) => {
  try {
    const userId = req.uuid;
    const savedPhotos = await getAppliedPhotoByUserId(userId);
    const photoN = savedPhotos.length;
    const photos = savedPhotos.map((photo) => ({
      photoId: photo.photoId,
      photoURL: photo.photoURL,
    }));
    console.log(`userId: ${userId + '\n'}photoCount:${photoN}`);

    res.status(200).json({
      photoN,
      photos,
    });
  } catch (err) {
    return res.status(500).json({ message: '서버 오류에요' });
  }
};
