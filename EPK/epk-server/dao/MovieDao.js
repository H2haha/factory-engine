/**
 * 演示了如何使用Http.js和BaseDao.js
 * 
 * 需求：
 * 1、获得大地影院正在热映的电影
 * 2、根据电影id查询电影详情
 */

const CONFIG = require('../framework/network/network.conf');
const BaseDao = require('./BaseDao');

function MovieDao() {
    
}

// 继承父类
MovieDao.prototype = new BaseDao(CONFIG.dadi.config);

/**
 * 获取热门电影列表
 */
MovieDao.prototype.getHot = function() {
    return this.network.get(CONFIG.dadi.api.hot);
}

/**
 * 根据id获取电影详情
 * @param {int} id 
 */
MovieDao.prototype.getById = function(id) {
    return this.network.get(`${CONFIG.dadi.api.detail}${id}`);
}

module.exports = MovieDao;