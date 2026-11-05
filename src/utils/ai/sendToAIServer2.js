import axios from 'axios';
import { config } from '../../config/config.js';
import https from 'https';

export const sendToAIServer2 = async (photoURL, styleId) => {
  try {
    const axiosInstance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    console.log(`AI Server2: ${config.AI2.URL}`);
    console.log('전송 data: ', photoURL, styleId);
    const response = await axiosInstance.post(
      config.AI2.URL,
      {
        image_url: photoURL,
        recommended_styles: [styleId],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 1200000,
      },
    );

    console.log('AI 서버2 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('AI 서버2 요청 실패:', error.message);
    // throw error;
  }
};
