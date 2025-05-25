import jwt from 'jsonwebtoken';
import axios from 'axios';
import { config } from '../../config/config.js';
import { findUserByKakaoId } from '../../db/user/user_db.js';

const loginHandler = async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ message: 'accessToken이 필요합니다.' });
  }

  try {
    // Kakao 사용자 정보 요청
    const kakaoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const kakaoUser = kakaoRes.data;
    const kakaoId = kakaoUser.id;

    // 사용자 존재 여부 확인
    if (!kakaoUser) {
      return res.status(401).json({ message: '카카오 유저가 존재하지 않음' });
    }

    // 사용자 회원가입 여부 확인
    const rows = await findUserByKakaoId(kakaoId);
    if (rows.length < 1) {
      return res.status(401).json({ message: '회원가입 필요' });
    }

    // JWT 발급
    const uuid = rows[0].userId;
    const token = jwt.sign({ uuid }, config.auth.secretKey, {
      expiresIn: '60m',
    });

    console.log('카카오 로그인 성공 uuid:', uuid);
    res.setHeader('authorization', `Bearer ${token}`);

    return res.status(200).json({
      message: '카카오 로그인 성공',
      data: {
        kakaoId,
        nickname: rows[0].nickname,
        token,
      },
    });
  } catch (error) {
    console.error('카카오 로그인 실패:', error.response?.data || error);
    return res.status(401).json({ message: '카카오 로그인 인증 실패' });
  }
};

export default loginHandler;
