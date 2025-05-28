import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';
import accountRouter from './routers/accounts.js';
import { swaggerUi, specs } from './swagger/swagger.js';
import initServer from './init/index.js';
import cors from 'cors';
import photoRouter from './routers/photo.js';

const app = express();
const server = createServer(app);

const PORT = config.server.port;
const HOST = config.server.host;

// 미들웨어
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: '*', // 또는 '*' (테스트용)
    exposedHeaders: ['authorization'], // ← 이게 중요!
  }),
);

// swagger 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 라우터 설정
app.use('/account', accountRouter);
app.use('/photo', photoRouter);

// init(DB 연동)
await initServer();

// 서버 시작
server.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://${HOST}:${PORT}`);
});
