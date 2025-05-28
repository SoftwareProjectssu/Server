import express from 'express';
import { photoRecommendHandler } from '../Controller/photo/uploadController.js';
import { authorization } from '../middleware/authorization/authorization.js';
import { upload } from '../middleware/multer/multer.js';
import { photoDyeHandler } from '../Controller/photo/dyeController.js';
const photoRouter = express.Router();

/**
 * @swagger
 * /photo/recommend:
 *   post:
 *     summary: S3에 사진 업로드 및 추천 요청
 *     description: 사용자가 업로드한 사진을 S3에 저장하고, DB에 추천용 사진으로 등록합니다.
 *     tags:
 *       - Photo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 이미지 파일
 *     responses:
 *       200:
 *         description: 업로드 성공 및 추천 처리 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photoURL:
 *                   type: string
 *                   description: S3에 업로드된 이미지 URL
 *                 photoId:
 *                   type: string
 *                   description: 업로드된 사진의 고유 ID
 *       400:
 *         description: 사진 누락 등 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: 서버 내부 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
photoRouter.post('/recommend', upload.single('photo'), authorization, photoRecommendHandler);
photoRouter.post('/dye', authorization, photoDyeHandler);
// photoRouter.post('/save', photoSaveHandler);

// photoRouter.get('/save', getSavePhotoHandler);
// photoRouter.get('/recommend', getRecommendPhotoHandler);
// photoRouter.get('/apply', getApplyPhotoHandler);
// photoRouter.get('/dye', getDyePhotoHandler);

export default photoRouter;
