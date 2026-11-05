import axios from 'axios';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../config/config.js';
import { findUserByKakaoId, insertUser } from '../../db/user/user_db.js';
import { uploadToS3 } from '../../utils/db/S3/s3Uploader.js';
import { insertPhoto } from '../../db/photo/photo_db.js';

const registerHandler = async (req, res) => {
  const { accessToken, nickname, faceType, sex } = req.body;
  const file = req.file;

  if (!accessToken || !nickname || !faceType || !sex) {
    return res.status(400).json({ message: '필수 정보가 누락되었습니다.' });
  }

  try {
    // Kakao API에서 사용자 정보 요청
    const kakaoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(kakaoRes);
    const kakaoId = kakaoRes.data.id;
    const uuid = uuidv4();
    // const kakaoId = nickname;
    // const uuid = uuidv4();

    // DB에서 카카오 ID로 유저 존재 여부 확인
    const rows = await findUserByKakaoId(kakaoId);

    if (rows.length > 0) {
      return res.status(400).json({ message: '이미 가입된 카카오 사용자입니다.' });
    }

    // 이미지 S3에 업로드하고 URL, photoId 반환
    let photo;
    if (file) {
      photo = await uploadToS3(file);
    } else photo = { photoId: -1, URL: -1 };

    // 사용자 정보 DB 저장
    let sexBool = 0;
    if (sex === '남자') sexBool = 1;
    const payload = { uuid, kakaoId, nickname, faceType, sex: sexBool, photoId: photo.photoId };
    await insertUser(payload);

    // DB에 사진 정보 저장
    const dbPayload = { photoId: photo.photoId, userId: uuid, photoURL: photo.URL };
    await insertPhoto(dbPayload);

    // JWT 발급
    const token = jwt.sign({ uuid }, config.auth.secretKey, {
      expiresIn: '60m',
    });

    res.setHeader('authorization', `Bearer ${token}`);
    return res.status(201).json({
      message: '카카오 회원가입 성공',
      data: {
        uuid,
        nickname,
        faceType,
        sex,
        representPhotoURL: photo.URL,
        token,
      },
    });
  } catch (err) {
    console.error('카카오 회원가입 실패:', err.response?.data || err.message);
    return res.status(500).json({ message: '서버 오류 발생' });
  }
};

export default registerHandler;
