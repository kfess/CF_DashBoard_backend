import { Router } from 'express';
import contestsRouter from './contestRoutes';
import problemsRouter from './problemRoutes';
import usersRouter from './userRoutes';
import customContestsRouter from './customContestRoutes';

const router = Router();
router.use('/api/contests', contestsRouter);
router.use('/api/problems', problemsRouter);
router.use('/api/users', usersRouter);
router.use('/api/custom-contests', customContestsRouter);

// ヘルスチェック用のエンドポイントを追加
router.get('/api/health-check', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is up and running',
  });
});

export default router;
