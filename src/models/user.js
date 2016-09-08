
import mongoose from 'mongoose';

var userSchema =  new mongoose.Schema({
      name:String,
      passwd:String
    });

var userModel = mongoose.model('user', userSchema, 'users');

export default userModel;