import Router from 'koa-router';
import api from './api'

const router = Router();

router.get('/', async (ctx, next) => {
  const title = 'cn_srv title';
  await ctx.render('index', {
    title
  })
});

router.use('/api', api.routes());

module.exports = router;
