import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';
import accountRouter from './routers/accounts.js';
import { swaggerUi, specs } from './swagger/swagger.js';

const app = express();
const server = createServer(app);

const PORT = config.server.port;
const HOST = config.server.host;

// Socket.IO 초기화
const io = initSocket(server);

// 미들웨어
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// swagger 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 라우터 설정

app.use('/account', accountRouter);

// 서버 시작
server.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://${HOST}:${PORT}`);
});
