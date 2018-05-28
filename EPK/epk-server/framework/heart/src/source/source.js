/**
 * 资源类
 */
const Util = require('../../util/util');

// 资源的状态   就绪，执行，阻塞，死亡
const STATUS = { ready: 'ready', running: 'running', blocked: 'blocked', death: 'death' }; 

function Source(source) {
    this.id = '';
    this.lock = false;
    this.exeTime = source.exeTime;   // 该资源的执行时间
    this.source = source.url;
    this.component = source.component;  //该资源对应的组件
    this.status = STATUS.ready;
    this.init();
}

/**
 * 资源初始化方法
 */
Source.prototype.init = function() {
    this.id = Util.genRandomId();
}

/**
 * 查看该资源是否被加锁
 */
Source.prototype.isLock = function() {
    return this.lock;
}

/**
 * 设置该资源的锁
 * @param {boolean} lock 
 */
Source.prototype.setLock = function(lock) {
    this.lock = lock;
}

/**
 * 执行该资源
 */
Source.prototype.handle = function() {
    throw '该方法必须要被重写';
}

module.exports = Source;