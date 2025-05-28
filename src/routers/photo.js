import express from 'express';
import { photoRecommendHandler } from '../Controller/photo/uploadController.js';
import { authorization } from '../middleware/authorization/authorization.js';
import { upload } from '../middleware/multer/multer.js';
const photoRouter = express.Router();

/**
 * @swagger
 * /photo/recommend:
 *   post:
 *     summary: 추천용 사진 업로드
 *     description: 사용자가 사진을 업로드하면 S3에 저장되고, 해당 URL과 photoId를 반환합니다.
 *     tags:
 *       - Photo
 *     security:
 *       - bearerAuth: []  # ← JWT 인증 필요
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 사용자 사진
 *     responses:
 *       200:
 *         description: 사진 업로드 및 추천 준비 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photoURL:
 *                   type: string
 *                   example: https://your-bucket.s3.ap-northeast-2.amazonaws.com/uploads/abc.jpg
 *                 photoId:
 *                   type: string
 *                   example: f9e1a1a9-456b-4f3e-b678-1234567890ab
 *       400:
 *         description: 사진이 누락된 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 사진이 누락되었습니다.
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: 토큰이 만료되었습니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 사진 추천 처리 중 서버 오류가 발생했습니다.
 */
photoRouter.post('/recommend', upload.single('photo'), authorization, photoRecommendHandler);
// photoRouter.post('/dye', photoDyeHandler);
// photoRouter.post('/save', photoSaveHandler);

// photoRouter.get('/save', getSavePhotoHandler);
// photoRouter.get('/recommend', getRecommendPhotoHandler);
// photoRouter.get('/apply', getApplyPhotoHandler);
// photoRouter.get('/dye', getDyePhotoHandler);

export default photoRouter;
