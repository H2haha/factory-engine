/**
 * 监听器
 */

const redis = require('../../config/redis.conf');
const KEY = 'source'

function Listener() {
    this.status = 'death';
    this.timeoutSourceList = [];    // 超时资源池
    this.startTime = 0;  // 计时器，用来计算是否超时
    this.source = null;
    this.init();
}

/**
 * 初始化监听器
 */
Listener.prototype.init = function() {
    console.log('Listener init');
    this.resetTimeoutSource();
}

/**
 * 将超时资源移入超时监听池
 */
Listener.prototype.pushTimeoutSourceList = function() {
    this.timeoutSourceList.push(source);
}

/**
 * 启动超时监听
 */
Listener.prototype.start = function(source) {
    this.source = source;
    this.startTime = new Date();
}

/**
 * 超时监听截止时间，返回是否超时的结果
 * @param {int} time 超时时间，毫秒
 */
Listener.prototype.end = function(source) {
    let endTime = new Date();
    // 判断是不是同一个资源的监听;
    if (this.source.id != source.id) {
        console.log('请先启动监听程序');
        return;
    }
    let isTimeout = parseInt(endTime - this.startTime) > source.exeTime;
    if (isTimeout) {
        console.log('该资源执行超时, id=' + source.id);
        this.pushTimeoutSourceList(source);
    }
    return isTimeout;
}

/**
 * 重置超时资源池
 */
Listener.prototype.resetTimeoutSourceList = function () {
    this.timeoutSourceList = []
}

module.exports = Listener;