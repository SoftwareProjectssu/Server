import express from 'express';
import { photoRecommendHandler } from '../Controller/photo/uploadController.js';
import { authorization } from '../middleware/authorization/authorization.js';
import { upload } from '../middleware/multer/multer.js';
import { photoDyeHandler } from '../Controller/photo/dyeController.js';
import { getSavedPhotoHandler } from '../Controller/photo/getPhoto/getSavedPhoto.js';
import { getRecommendedPhotoHandler } from '../Controller/photo/getPhoto/getRecommendedPhoto.js';
import { getDyedPhotoHandler } from '../Controller/photo/getPhoto/getDyedPhoto.js';
import { getAppliedPhotoHandler } from '../Controller/photo/getPhoto/getAppliedPhoto.js';
import { savePhotoHandler } from '../Controller/photo/postPhoto/savePhoto.js';

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

/**
 * @swagger
 * /photo/save:
 *   patch:
 *     summary: 특정 photoId를 저장 목록에 추가합니다.
 *     description: 사용자 ID와 photoId를 기반으로 해당 사진을 저장된 사진 목록에 추가합니다.
 *     tags:
 *       - Photo
 *     security:
 *       - bearerAuth: []  # Authorization 헤더 필요 시 사용
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photoId:
 *                 type: string
 *                 format: uuid
 *                 example: "6909ca3b-651b-4551-8cd6-a8a9d8ff690f"
 *     responses:
 *       200:
 *         description: 사진 저장 성공
 *       400:
 *         description: 잘못된 요청 (photoId 누락 등)
 *       500:
 *         description: 서버 오류
 */
photoRouter.patch('/save', authorization, savePhotoHandler);

photoRouter.post('/dye', authorization, photoDyeHandler);

/**
 * @swagger
 * /photo/save:
 *   get:
 *     summary: 저장된 사진 목록 조회
 *     description: 사용자가 저장한 사진 목록을 조회합니다.
 *     tags:
 *       - Photo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 저장된 사진 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photoN:
 *                   type: integer
 *                   description: 저장된 사진 개수
 *                   example: 2
 *                 photos:
 *                   type: array
 *                   description: 저장된 사진 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       photoId:
 *                         type: string
 *                         description: 사진 고유 ID
 *                         example: "6909ca3b-651b-4551-8cd6-a8a9d8ff690f"
 *                       photoURL:
 *                         type: string
 *                         description: 사진이 저장된 S3 URL
 *                         example: "https://hair-image-db.s3.ap-northeast-2.amazonaws.com/uploads/6909ca3b-651b-4551-8cd6-a8a9d8ff690f.png"
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류에요"
 */
photoRouter.get('/save', authorization, getSavedPhotoHandler);

/**
 * @swagger
 * /photo/recommend:
 *   get:
 *     summary: 추천된 사진 목록 조회
 *     description: 사용자의 추천된 사진 목록과 사진 개수를 반환합니다.
 *     tags:
 *       - Photo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 추천된 사진 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photoN:
 *                   type: integer
 *                   description: 추천된 사진 개수
 *                   example: 3
 *                 photos:
 *                   type: array
 *                   description: 추천된 사진 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       photoId:
 *                         type: string
 *                         description: 사진의 고유 ID
 *                         example: "6909ca3b-651b-4551-8cd6-a8a9d8ff690f"
 *                       photoURL:
 *                         type: string
 *                         description: 사진이 업로드된 S3 URL
 *                         example: "https://hair-image-db.s3.ap-northeast-2.amazonaws.com/uploads/6909ca3b-651b-4551-8cd6-a8a9d8ff690f.png"
 *       500:
 *         description: 서버 오류 발생 시 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류에요"
 */
photoRouter.get('/recommend', authorization, getRecommendedPhotoHandler);

/**
 * @swagger
 * /photo/apply:
 *   get:
 *     summary: 적용된 사진 목록 조회
 *     description: 사용자가 적용한 헤어스타일 사진 목록을 조회합니다.
 *     tags:
 *       - Photo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 적용된 사진 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photoN:
 *                   type: integer
 *                   description: 적용된 사진 개수
 *                   example: 2
 *                 photos:
 *                   type: array
 *                   description: 적용된 사진 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       photoId:
 *                         type: string
 *                         description: 사진 고유 ID
 *                         example: "6909ca3b-651b-4551-8cd6-a8a9d8ff690f"
 *                       photoURL:
 *                         type: string
 *                         description: 사진이 저장된 S3 URL
 *                         example: "https://hair-image-db.s3.ap-northeast-2.amazonaws.com/uploads/6909ca3b-651b-4551-8cd6-a8a9d8ff690f.png"
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류에요"
 */
photoRouter.get('/apply', authorization, getAppliedPhotoHandler);

/**
 * @swagger
 * /photo/dye:
 *   get:
 *     summary: 염색한 사진 목록 조회
 *     description: 사용자가 염색한 헤어스타일 사진 목록을 조회합니다.
 *     tags:
 *       - Photo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 염색한 사진 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photoN:
 *                   type: integer
 *                   description: 염색한 사진 개수
 *                   example: 3
 *                 photos:
 *                   type: array
 *                   description: 염색한 사진 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       photoId:
 *                         type: string
 *                         description: 사진 고유 ID
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       photoURL:
 *                         type: string
 *                         description: S3에 저장된 사진 URL
 *                         example: "https://hair-image-db.s3.ap-northeast-2.amazonaws.com/uploads/sample.png"
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류에요"
 */
photoRouter.get('/dye', authorization, getDyedPhotoHandler);

export default photoRouter;
