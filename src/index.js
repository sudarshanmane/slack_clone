// import email processor to initiate the process of sending email
import './processor/mailProcessor.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { urlencoded } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { messageHandlers } from './b_controllers/channelSocketController.js';
import messageSocketHandlers from './b_controllers/messageSocketController.js';
import bullServerAdapter from './config/bullBoardConfi.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import apiRouter from './routes/apiRoutes.js';
import { AppError } from './utils/errors/appError.js';

const app = express();

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  messageHandlers(io, socket);
  messageSocketHandlers(io, socket);
});

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  console.log(req.originalUrl);

  next();
});

app.use('/api', apiRouter);
app.use('/ui', bullServerAdapter.getRouter());

app.use('/', function (req, res) {
  const error = new AppError(
    `Can't find path ${req.originalUrl} on this server!`,
    400
  );

  throw error;
});

app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDB();
});
