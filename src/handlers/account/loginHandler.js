import jwt from 'jsonwebtoken';
import axios from 'axios';
import { config } from '../../config/config.js';

const loginHandler = async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ message: 'accessToken이 필요합니다.' });
  }

  try {
    // Kakao 사용자 정보 요청
    /*const kakaoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const kakaoUser = kakaoRes.data;
    const kakaoId = kakaoUser.id;
    const nickname = kakaoUser.properties?.nickname;
*/
    // 사용자 존재 여부 확인 → 없으면 회원가입 처리
    // 예시: DB에서 kakaoId로 사용자 조회 또는 생성
    // const user = await findOrCreateUser(kakaoId, nickname);
    const kakaoId = accessToken;
    // JWT 발급
    const token = jwt.sign(
      {
        type: 'JWT',
        uuid: kakaoId,
      },
      config.auth.secretKey,
      {
        expiresIn: '60m',
      },
    );

    console.log('카카오 로그인 성공:', kakaoId);
    res.setHeader('authorization', `Bearer ${token}`);

    return res.status(200).json({
      message: '카카오 로그인 성공',
      data: {
        kakaoId,
        // nickname,
        token,
      },
    });
  } catch (error) {
    console.error('카카오 로그인 실패:', error.response?.data || error);
    return res.status(401).json({ message: '카카오 로그인 인증 실패' });
  }
};

export default loginHandler;
