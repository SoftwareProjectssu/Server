import axios from 'axios';
import { config } from '../../config/config.js';

export const sendToAIServer1 = async (userId, photoURL, gender) => {
  try {
    console.log(`AI Server1: 'http://${config.AI.HOST}:${config.AI.PORT}/infer'`);
    console.log('전송 data: ', userId, photoURL, gender);
    const response = await axios.post(
      `http://${config.AI.HOST}:${config.AI.PORT}/infer`,
      {
        photoURL,
        uId: userId,
        gender,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('AI 서버1 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('AI 서버1 요청 실패:', error.message);
    // throw error;
  }
};
