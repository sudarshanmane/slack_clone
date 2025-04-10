import express, { urlencoded } from 'express';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDB();
});
