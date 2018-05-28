/**
 * 监控池类
 */

// 导入reids配置
const redis = require('../../config/redis.conf');

// redis中资源数据的key标识
const KEY = 'source'

function Pool() {
    this.init();
}

/**
 * 初始化方法
 */
Pool.prototype.init = function () {
    console.log('pool init');
}

/**
 * 将资源注册到注册池中
 * @param {Source} source 
 */
Pool.prototype.register = function (sourceList, cb) {
    // 类型判断，必须为数组
    if (Object.prototype.toString.call(sourceList) !== '[object Array]') {
        throw '被注册的资源列表必须为数组类型';
    }
    // 删除旧的资源列表
    redis.del(KEY);
    // 批量注册资源
    sourceList.forEach(source => {
        redis.lpush(KEY, JSON.stringify(source), cb)
    });
}

/**
 * 从注册池中移除资源
 * @param {String} key 
 */
Pool.prototype.remove = function (key) {
    return new Promise((resolve, reject) => {
        redis.del(key, (err, data) => {
            err ? reject(err) : resolve(data);
        })
    })
}

/**
 * 根据key获取资源
 * @param {String} key 
 */
Pool.prototype.get = function(key) {
    return new Promise((resolve, reject) => {
        redis.get(key, (err, data) => {
            if (!key) {
               reject('key不能为空'); 
            }
            err ? reject(err) : resolve(data);
        });
    })
}

/**
 * 关闭redis连接
 */
Pool.prototype.close = function () {
    redis.quit();
}

module.exports = Pool;