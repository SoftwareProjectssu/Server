import axios from 'axios';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../config/config.js';

const registerHandler = async (req, res) => {
  const { accessToken, facetype, sex, photo } = req.body;

  if (!accessToken || !facetype || !sex || !photo) {
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
    const nickname = kakaoRes.data.properties?.nickname || 'NoName';
    const uuid = uuidv4();

    // DB에서 카카오 ID로 유저 존재 여부 확인
    const [rows] = await db.query('SELECT * FROM users WHERE kakao_id = ?', [kakaoId]);

    if (rows.length > 0) {
      return res.status(400).json({ message: '이미 가입된 카카오 사용자입니다.' });
    }

    // 사용자 정보 DB 저장
    await db.query(
      'INSERT INTO users (uuid, kakao_id, nickname, facetype, sex, photo) VALUES (?, ?, ?, ?, ?, ?)',
      [uuid, kakaoId, nickname, facetype, sex, photo],
    );

    // JWT 발급
    const token = jwt.sign({ kakaoId, uuid }, config.auth.secretKey, {
      expiresIn: '60m',
    });

    return res.status(201).json({
      message: '카카오 회원가입 성공',
      data: {
        uuid,
        nickname,
        facetype,
        sex,
        photo,
        token,
      },
    });
  } catch (err) {
    console.error('카카오 회원가입 실패:', err.response?.data || err.message);
    return res.status(500).json({ message: '서버 오류 발생' });
  }
};

export default registerHandler;
