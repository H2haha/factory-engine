/**
 * 访问资源对象，封装对资源池的操作
 */
const redis = require('../../config/redis.conf');
// redis中资源数据的key标识
const KEY = 'source';

function VisitSource() {
    
}

/**
 * 初始化
 */
VisitSource.prototype.init = function () {
    
}

/**
 * 根据阈值获取资源列表
 * @param {int} count 阈值，为空表示获取所有的资源列表
 */
VisitSource.prototype.getSourceList = function (count) {
    // redis客户端的计数以0位基准,此处处理为以1为基准
    count = count ? count : 0
    return new Promise((resolve, reject) => {
        redis.lrange(KEY, 0,  --count, (err, sourceList) => {
            // 反序列化资源对象
            sourceList = sourceList.map(source =>  source = JSON.parse(source));
            err ? reject(err) : resolve(sourceList);
        })
    })
}

/**
 * 根据阈值获取未被lock的资源列表
 * @param {int} count 
 */
VisitSource.prototype.getUnlockSourceList = async function (count) {
    const sourceList = await this.getSourceList();
    return sourceList.filter(source => JSON.parse(source).lock === false);
}

/**
 * 根据id给资源加锁
 * @param {String} id 
 */
VisitSource.prototype.lock = async function (id) {
    await setLock(this, id, true);
}

/**
 * 根据id给资源解锁
 * @param {String} id 
 */
VisitSource.prototype.unlock = async function (id) {
    await setLock(this, id, false);
}

/**
 * 根据id给资源设置状态
 * @param {String} id 
 * @param {String} status 
 */
VisitSource.prototype.setStatus = async function (id, status) {
    const sourceList = await this.getSourceList();
    sourceList.forEach(source => {
        source.id === id ? source.status = status : '';
    });
    await redis.del(KEY)
    sourceList.forEach(source => {
        redis.lpush(KEY, JSON.stringify(source))
    });
}

VisitSource.prototype.close = function () {
    redis.quit();
}

/**
 * 设置锁的状态
 * @param {VisitSource} visitSource 
 * @param {String} id 
 * @param {Boolean} boolean 
 */
async function setLock(visitSource, id,  boolean) {
    const sourceList = await visitSource.getSourceList();
    sourceList.forEach(source => {
        source.id === id ? source.lock = boolean : '';
    });
    await redis.del(KEY)
    sourceList.forEach(source => {
        redis.lpush(KEY, JSON.stringify(source))
    });
}

module.exports = VisitSource;
