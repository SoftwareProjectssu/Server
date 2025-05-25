import axios from 'axios';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../config/config.js';
import { findUserByKakaoId, insertUser } from '../../db/user/user_db.js';
import { uploadToS3 } from '../../utils/db/S3/s3uploader.js';
import { insertPhoto } from '../../db/photo/photo_db.js';

const registerHandler = async (req, res) => {
  const { accessToken, nickname, faceType, sex } = req.body;
  const file = req.file;

  if (!accessToken || !nickname || !faceType || !sex || !file) {
    return res.status(400).json({ message: '필수 정보가 누락되었습니다.' });
  }

  try {
    // Kakao API에서 사용자 정보 요청
    const kakaoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const kakaoId = kakaoRes.data.id;
    const uuid = uuidv4();

    // DB에서 카카오 ID로 유저 존재 여부 확인
    const rows = await findUserByKakaoId(kakaoId);

    if (rows.length > 0) {
      return res.status(400).json({ message: '이미 가입된 카카오 사용자입니다.' });
    }

    // 이미지 S3에 업로드하고 URL 반환
    //const photo = await uploadToS3(file);
    const photo = {};

    // S3 URL로 DB에 사진 저장
    await insertPhoto(photo.photoId, uuid, photo.URL);

    // 사용자 정보 DB 저장
    const payload = { uuid, kakaoId, nickname, faceType, sex, photoUrl: photo.URL };
    await insertUser(payload);

    // JWT 발급
    const token = jwt.sign({ uuid }, config.auth.secretKey, {
      expiresIn: '60m',
    });

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
