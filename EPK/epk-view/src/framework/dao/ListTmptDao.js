/**
 * list模板dao
 * 1、获取list模板数据
 */

import CONFIG from '../network/network.conf';
import {BaseDao} from '../dao/BaseDao';

function ListTmptDao() {
    
}

// 继承父类
ListTmptDao.prototype = new BaseDao(CONFIG.dadi.config);

/**
 * 获取list模板数据
 */
ListTmptDao.prototype.getListTmptData = function() {
    return this.network.get(CONFIG.dadi.tmpt_api.list);
}

export {ListTmptDao};

