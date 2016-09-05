import Router from 'koa-router';

const router = Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello Bird';
});

export default router;
