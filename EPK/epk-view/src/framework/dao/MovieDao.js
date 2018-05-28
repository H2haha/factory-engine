
/**
 * 电影dao
 * 1、获取热门电影列表
 */

import CONFIG from '../network/network.conf';
import {BaseDao} from '../dao/BaseDao';

function MovieDao() {
    
}

// 继承父类BaseDao
MovieDao.prototype = new BaseDao(CONFIG.dadi.config)

/**
 * 获取正在热映的电影列表
 * @param {Object} Object 
 */
MovieDao.prototype.getHot = function() {
    return this.network.get(CONFIG.dadi.biz_api.hot);
}

export {MovieDao};
