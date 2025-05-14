import express from 'express';
import registerHandler from '../Controller/account/registerController.js';
import loginHandler from '../Controller/account/loginController.js';
import { authorization } from '../authorization/authorization.js';

const accountRouter = express.Router();

/**
 * @swagger
 * /account/register:
 *   post:
 *     summary: 카카오 회원가입
 *     tags:
 *       - Account
 *     description: 카카오 accessToken과 추가 정보를 받아 회원가입을 수행합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 example: "kakao-access-token"
 *               facetype:
 *                 type: string
 *                 example: "오이"
 *               sex:
 *                 type: string
 *                 example: "남자"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 카카오 회원가입 성공
 *                 data:
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     facetype:
 *                       type: string
 *                     sex:
 *                       type: string
 *                     photo:
 *                       type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: 잘못된 요청 또는 이미 존재하는 사용자
 *       500:
 *         description: 서버 오류
 */
accountRouter.post('/register', registerHandler);

/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: 카카오 로그인
 *     tags:
 *       - Account
 *     description: 프론트에서 받은 카카오 accessToken을 통해 로그인 처리 후 JWT 발급
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 example: "kakao-access-token"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 카카오 로그인 성공
 *                 data:
 *                   type: object
 *                   properties:
 *                     kakaoId:
 *                       type: number
 *                     nickname:
 *                       type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: accessToken 없음
 *       401:
 *         description: 카카오 인증 실패
 */
accountRouter.post('/login', loginHandler);

accountRouter.get('/test', authorization, async (req, res) => {
  const { decodedToken } = req;
  console.log(decodedToken);
  res.status(200).json({ message: decodedToken });
});

export default accountRouter;
