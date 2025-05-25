import multer from 'multer';

const storage = multer.memoryStorage(); // S3에 올릴 때는 메모리 버퍼 사용
export const upload = multer({ storage });
