
import mongoose from 'mongoose';

exports.midDb =  () => {
  mongoose.connect('mongodb://localhost/xdd_dev');

  return (ctx, next) => {
    return next();
  }
}
