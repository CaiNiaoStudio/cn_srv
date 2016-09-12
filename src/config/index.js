/**
 * Created at 16/4/11.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import {merge} from 'lodash'
import development from './development';
import test from './test';
import production from './production';

var env = process.env.NODE_ENV || 'development';
var configs = {
  development: development,
  test: test,
  production: production
};
var defaultConfig = {
  env
};

var config = merge(defaultConfig, configs[env]);
module.exports = config;

