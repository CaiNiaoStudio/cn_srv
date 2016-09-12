
import mongoose from 'mongoose';

exports.midDb =  (dbOpt) => {
  mongoose.connect(`mongodb://${dbOpt.host}/${dbOpt.database}`);

  return (ctx, next) => {
    return next();
  }
}
