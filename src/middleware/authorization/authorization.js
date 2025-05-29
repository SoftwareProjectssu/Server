import jwt from 'jsonwebtoken';
import { config } from '../../config/config.js';
import { findUserByUserId } from '../../db/user/user_db.js';

export const authorization = async (req, res, next) => {
  try {
    // console.log(req);
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) throw new Error('토큰이 존재하지 않습니다.');
    const [tokenType, token] = authorization.split(' ');

    if (tokenType !== 'Bearer') throw new Error('토큰 타입이 일치하지 않습니다.');
    const decodedToken = jwt.verify(token, config.auth.secretKey);
    console.log(`token authorization success\ndecodedToken: ${decodedToken}`);
    req.decodedToken = decodedToken;

    // decodedToken의 사용자 ID가 DB에 있는지 확인
    const userId = decodedToken.uuid;
    const [user] = await findUserByUserId(userId);
    if (!user) {
      return res.status(400).json({ message: '사용자가 존재하지 않습니다.' });
    }

    req.uuid = userId;
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie('authorization');
    switch (error.name) {
      case 'TokenExpiredError': // 토큰이 만료되었을 때 발생하는 에러
        return res.status(401).json({ errorMessage: '토큰이 만료되었습니다.' });
      case 'JsonWebTokenError': // 토큰 검증이 실패했을 때, 발생하는 에러
        return res.status(401).json({ errorMessage: '토큰 인증에 실패하였습니다.' });
      default:
        return res.status(401).json({
          errorMessage: error.errorMessage ?? '비 정상적인 요청입니다.',
        });
    }
  }
};
