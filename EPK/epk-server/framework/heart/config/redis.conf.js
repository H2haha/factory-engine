/**
 * redis配置管理器
 */
//引入模块
const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let conn = redis.createClient(6379, 'localhost');

//连接redis
module.exports = conn;