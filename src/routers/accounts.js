import express from 'express';
import registerHandler from '../Controller/account/registerController.js';
import loginHandler from '../Controller/account/loginController.js';
import { authorization } from '../middleware/authorization/authorization.js';
import { upload } from '../middleware/multer/multer.js';

const accountRouter = express.Router();

/**
 * @swagger
 * /account/register:
 *   post:
 *     summary: 카카오 회원가입
 *     description: 카카오 accessToken으로 유저 인증 후, 이미지 파일을 S3에 업로드하고 회원가입을 완료합니다.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - accessToken
 *               - nickname
 *               - faceType
 *               - sex
 *               - photo
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: Kakao OAuth access token
 *                 example: "kakao-access-token"
 *               nickname:
 *                 type: string
 *                 description: 사용자 닉네임
 *                 example: "헝거르졸"
 *               faceType:
 *                 type: string
 *                 description: 얼굴형 정보
 *                 example: "오이"
 *               sex:
 *                 type: string
 *                 description: 성별
 *                 example: "남자"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: 프로필 사진 (이미지 파일)
 *     responses:
 *       '201':
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
 *                       example: a6c8207d-ff28-48e3-9b3f-8f1ea31293b3
 *                     nickname:
 *                       type: string
 *                       example: 헝거르졸
 *                     faceType:
 *                       type: string
 *                       example: 오이
 *                     sex:
 *                       type: string
 *                       example: 남자
 *                     representPhotoURL:
 *                       type: string
 *                       example: https://your-s3-bucket.s3.ap-northeast-2.amazonaws.com/uploads/uuid.jpg
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '400':
 *         description: 필수 정보 누락 or 이미 가입된 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 이미 가입된 카카오 사용자입니다.
 *       '500':
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 서버 오류 발생
 */
accountRouter.post('/register', upload.single('photo'), registerHandler);

/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: 카카오 로그인
 *     description: Kakao accessToken을 사용하여 로그인하고 JWT 토큰을 발급받습니다.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accessToken
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: Kakao OAuth access token
 *                 example: "kakao-access-token"
 *     responses:
 *       '200':
 *         description: 로그인 성공
 *         headers:
 *           authorization:
 *             description: JWT 토큰 (Bearer)
 *             schema:
 *               type: string
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
 *                       type: integer
 *                       example: 123456789
 *                     nickname:
 *                       type: string
 *                       example: 헝거르졸
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '400':
 *         description: accessToken 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: accessToken이 필요합니다.
 *       '401':
 *         description: 인증 실패 or 미가입 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 카카오 로그인 인증 실패
 */
accountRouter.post('/login', loginHandler);

accountRouter.get('/test', authorization, async (req, res) => {
  const { decodedToken } = req;
  console.log(decodedToken);
  res.status(200).json({ message: decodedToken });
});

export default accountRouter;
