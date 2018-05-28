/**
 * 对网络请求的封装，支持http和https的请求
 * 1、请求参数自定义配置
 * 2、提供get请求
 * 3、提供post请求
 * 4、提供all并发请求
 */

const axios = require('axios');

/**
 * 定义Network请求类
 * @param {Object} config
 */
function Network(config) {
    this.network = null;
    this.init(config);
}

/**
 * 初始化对象
 * @param {Object} config 
 */
Network.prototype.init = function(config) {
    this.network = axios.create(config);
}

/**
 * Get请求封装
 * @param {String} url 
 * @param {Object} params 
 */
Network.prototype.get = function(url, params) {
    return this.network.get(url, params);
}

/**
 * Post请求封装
 * @param {String} url 
 * @param {Object} params 
 */
Network.prototype.post = function(url, params) {
    return this.network.post(url, params);
}

/**
 * 处理异步并发请求
 * https://github.com/axios/axios#example
 * @param {Array} array 该参数为Promise方法组成的数组
 */
Network.prototype.all = function(array) {
    return new Promise((resolve, rejcct) => {
        this.network.all(array).then(axios.spread((() => {
            resolve(arguments);
        })));
    })
}

module.exports = Network;