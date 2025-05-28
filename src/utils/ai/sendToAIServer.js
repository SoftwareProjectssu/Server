import axios from 'axios';
import { config } from '../../config/config.js';

export const sendToAIServer = async ({ userId, imageUrl, gender }) => {
  try {
    console.log(`http://${config.AI.HOST}:${config.AI.PORT}/infer`);
    console.log('전송: ', userId, imageUrl, typeof gender);
    const response = await axios.post(
      `http://${config.AI.HOST}:${config.AI.PORT}/infer`,
      {
        photoURL: imageUrl,
        uId: userId,
        gender: gender,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('AI 서버 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('AI 서버 요청 실패:', error.message);
    // throw error;
  }
};
