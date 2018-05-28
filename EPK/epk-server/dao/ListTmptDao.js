/**
 * list模板dao
 */

const CONFIG = require('../framework/network/network.conf');
const BaseDao = require('../dao/BaseDao');

function ListTmptDao () {
    
}

// 继承父类
ListTmptDao.prototype = new BaseDao(CONFIG.tmpt.config);

/**
 * 获取模板数据
 */
ListTmptDao.prototype.getTmptData = function () {
    return this.network.get(CONFIG.tmpt.api.list);
}

module.exports = ListTmptDao;