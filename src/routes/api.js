import Router from 'koa-router';
import mongoose from 'mongoose';
import userModel from './../models/user.js';

const router = Router();

router.get('/signin', async (ctx, next) => {
  var userEntity = new userModel( {name: ctx.query.loginNo, passwd: ctx.query.passwd});
  console.log("user: ", userEntity);
  userEntity.save((err)=>{
    if(!err) 
      console.log('save success');
    else
      console.log('err ', err);
  });
  ctx.status = 200;
});

export default router;
