import { uploadToS3 } from '../../utils/db/S3/s3Uploader.js';

export const photoRecommendHandler = async (req, res) => {
  try {
    const userId = req.uuid;
    const file = req.file;

    console.log('사용자 ID:', userId);

    if (!file) {
      return res.status(400).json({ message: '사진이 누락되었습니다.' });
    }

    // 이미지 S3에 업로드하고 URL, photoId 반환
    const photo = await uploadToS3(file);
    console.log('사진 업로드:', photo);

    res.status(200).json({
      photoURL: photo.URL,
      photoId: photo.photoId,
    });
  } catch (error) {
    console.error('사진 추천 처리 중 오류:', error);
    res.status(500).json({
      message: '사진 추천 처리 중 서버 오류가 발생했습니다.',
      error: error.message,
    });
  }
};
