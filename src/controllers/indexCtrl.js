export default async (ctx, next) => {
  const title = 'cn_srv title';

  await ctx.render('index', {
    title
  })
}
