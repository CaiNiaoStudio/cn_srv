import Router from 'koa-router';

const router = Router();

router.get('/signin', async (ctx, next) => {
  console.log("login: ", ctx.query.loginNo);
});

export default router;
