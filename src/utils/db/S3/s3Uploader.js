import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from '../../../config/config.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const s3 = new S3Client({
  /*
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },*/
});

export const uploadToS3 = async (file) => {
  /*
  const ext = path.extname(file.originalname);
  const uuid = uuidv4();
  const key = `uploads/${uuid}${ext}`;

  const command = new PutObjectCommand({
    Bucket: config.aws.bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return {
    URL: `https://${config.aws.bucketName}.s3.${config.aws.region}.amazonaws.com/${key}`,
    photoId: uuid,
  };*/
};
