import express from 'express';
import bottleRouter from './routes/bottleRoutes';

const PORT = 3000;

const app = express();
app.use(express.json());

app.use('/api/v1/bottles', bottleRouter);

app.get('/', (req, res) => {
  const path = req.path;
  res.status(200).json({ reqPath: path });
});

export default app;
