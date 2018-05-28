/**
 * 数据访问base接口定义
 * 1、保存实例
 * 2、根据id删除实例
 * 3、更新实例
 * 4、根据id获取实例
 * 5、获取列表
 */

import Network from '../network/network'

function BaseDao(config) {
    this.network = new Network(config);
}

/**
 * 保存实体
 * @param {Object} Object 
 */
BaseDao.prototype.save = function(Object) {
    throw '该方法必须重写';
}

/**
 * 根据id删除实体
 * @param {int} id 
 */
BaseDao.prototype.deleteById = function(id) {
    throw '该方法必须重写';
}

/**
 * 更新实体
 * @param {Object} Object 
 */
BaseDao.prototype.update = function(Object) {
    throw '该方法必须重写';
}

/**
 * 根据id删除实体
 * @param {int} id 
 */
BaseDao.prototype.getById = function(id) {
    throw '该方法必须重写';
}

/**
 * 获取列表数据
 */
BaseDao.prototype.list = function() {
    throw '该方法必须重写';
}

export {BaseDao};
