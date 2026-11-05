import { findByPhotoId, insertPhoto } from '../../db/photo/photo_db.js';
import { sendToAIServer1 } from '../../utils/ai/sendToAIServer1.js';
import { sendToAIServer2 } from '../../utils/ai/sendToAIServer2.js';
import { uploadToS3 } from '../../utils/db/S3/s3Uploader.js';
import { convertKoreanToStyleId } from '../../utils/hairStyleMapping.js';
let order = 0;
export const photoRecommendHandler = async (req, res) => {
  try {
    const userId = req.uuid;
    const user = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: '사진이 누락되었습니다.' });
    }

    console.log('업로드 사용자 ID:', userId);

    // 이미지 S3에 업로드하고 URL, photoId 반환
    const photo = await uploadToS3(file);
    console.log('사진 업로드:', photo);

    // DB에 업로드한 사진 저장
    const dbPayload = { photoId: photo.photoId, userId, photoURL: photo.URL, saved: true };
    await insertPhoto(dbPayload);

    // AI 서버에 사진 전송, 어울리는 스타일 받기(json)
    // console.log('유저: ', user);
    // const AI1_responseData = await sendToAIServer1(userId, photo.URL, user.sex);

    // AI 서버2에 사진 URL, 추천 받은 스타일 전송해서 스타일 대표 사진 받기
    // const styleId = convertKoreanToStyleId(AI1_responseData.style_name);
    // const styleId = convertKoreanToStyleId('포마드');
    // const AI2_responseData = await sendToAIServer2(photo.URL, styleId);
    // console.log(AI2_responseData);
    // res.status(200).json({ AI2_responseData });
    // res.status(200).json({
    //   photoURL: AI2_responseData.URL,
    //   photoId: AI2_responseData.photoId,
    // });
    console.log('order:' + order);
    if (order == 0) {
      const [dummy] = await findByPhotoId('8b13b8f7-54c0-4c51-afda-f39036b2028b');
      order++;
      return res.status(200).json({
        photoURL: dummy.photoURL,
        photoId: dummy.photoId,
      });
    } else if (order == 1) {
      const [dummy2] = await findByPhotoId('e26dcf8f-e02e-4a3b-bd3c-9364b632b811');
      order++;
      return res.status(200).json({
        photoURL: dummy2.photoURL,
        photoId: dummy2.photoId,
      });
    }
    // res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error('사진 추천 처리 중 오류:', error);
    res.status(500).json({
      message: '사진 추천 처리 중 서버 오류가 발생했습니다.',
      error: error.message,
    });
  }
};
