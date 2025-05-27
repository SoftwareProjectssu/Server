import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from '../../../config/config.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const AWS_S3 = config.databases.S3;

const s3 = new S3Client({
  region: AWS_S3.region,
  credentials: {
    accessKeyId: AWS_S3.accessKeyId,
    secretAccessKey: AWS_S3.secretAccessKey,
  },
});

export const uploadToS3 = async (file) => {
  const ext = path.extname(file.originalname);
  const uuid = uuidv4();
  const key = `uploads/${uuid}${ext}`;

  const command = new PutObjectCommand({
    Bucket: AWS_S3.bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return {
    URL: `https://${AWS_S3.bucketName}.s3.${AWS_S3.region}.amazonaws.com/${key}`,
    photoId: uuid,
  };
};
