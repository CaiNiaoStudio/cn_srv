import Router from 'koa-router';
import api from './api'

const router = Router();

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

router.use('/api', api.routes());

module.exports = router;

