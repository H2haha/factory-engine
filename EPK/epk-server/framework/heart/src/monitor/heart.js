/**
 * 心跳类
 * 1、初始化心跳配置
 * 2、设置心跳属性
 */

 // 1、导入心跳配置
const HEART_CONFIG = require('../../config/heart.conf');
// 导入监听器
const Listener = require('./listener');
// 加载监控资源配置
const CONFIG = require('../../config/source.conf');

// 资源的状态   就绪，执行，阻塞，死亡
const STATUS = { ready: 'ready', running: 'running', blocked: 'blocked', death: 'death' }; 
// 处理超时资源的循环时间
const HANDLE_TIMEOUT_TIME = 10000;

// 引入访问资源的对象并初始化
const VisitSource = require('../monitor/VisitSource');
const visitSource = new VisitSource(CONFIG);

const axios = require('axios');

function Heart() {
    // 初始化监听器
    this.listener = new Listener();
    this.fn = null;
    this.isLive = true;
    this.sourceCount = CONFIG.source.length;    // 阈值
    this.init();
}

/**
 * 初始化心跳
 */
Heart.prototype.init = function() {
    // 2、设置心跳属性
    this.rate = HEART_CONFIG.rate || 3000;
    this.fn = job;
    // 循环处理超时资源
    this.handleTimeoutSource = setInterval(this.esetTimeoutSource, HANDLE_TIMEOUT_TIME);
    console.log('heart init');
}

/**
 * 心跳业务
 * 访问监控资源
 */
async function job() {
    console.log('peng~');
    // 从监控池中获取未被lock的资源
    let sourceList = await visitSource.getUnlockSourceList(this.sourceCount);
    sourceList.forEach(source => {
        // 更新资源的状态为ready
        visitSource.setStatus(source.id, STATUS.ready);
        // 给资源设置锁
        visitSource.lock(source.id);
        // 更新资源的状态为running
        visitSource.setStatus(source.id, STATUS.running);
        // 执行资源，只有状态为ready的job才能执行
        if (source.status === STATUS.ready) {
            let exeResult = await exeSource(source, this.listener);
            // 更新资源的状态为ready
            visitSource.setStatus(source.id, STATUS.ready);
            console.log(`资源执行状态：${exeResult}`);   
        }
    });

    // TODO 通知监控资源所属组件执行 (后面再做)
}

/**
 * 执行资源
 * @param {Source} source 要执行的资源
 * @param {Listener} listener 监听器用来做超时监听
 * 
 */
async function exeSource(source, listener) {
    // 开启超时监听
    listener.start(source);
    // 执行资源
    let response = await axios.get(source.source);
    // 结束超时监听，返回是否超时的结果
    let isTimeout = listener.end(source);
    if (isTimeout) {
        // 打印执行超时的资源
        console.log(`资源执行超时， id: ${source.id}, url: ${source.url}`);
        // 对于执行超时的资源更新状态为阻塞
        visitSource.setStatus(source.id, STATUS.blocked);
    }
    // 执行正常返回true，超时返回false
    return !isTimeout;
}

/**
 * 启动心跳
 */
Heart.prototype.beat = function() {
    let that = this;
    let interval = function() {
        if (!that.isLive) return;
        that.fn ? that.fn() : '';
        setTimeout(interval, that.rate);
    };
    setTimeout(interval, that.rate);
}

/**
 * 重置超时资源
 */
Heart.prototype.resetTimeoutSource = function () {
    // 超时资源列表
    const timeoutSourceList = this.listener.timeoutSourceList;
    // 最新的资源列表
    const sourceList = await visitSource.getUnlockSourceList(this.sourceCount);
    // 重新比对然后重置
    timeoutSourceList.forEach(timeoutSource => {
        sourceList.forEach(source => {
            if (timeoutSource.id === source.id && source.lock && source.status === STATUS.blocked) {
                visitSource.unlock(source.id);
                visitSource.setStatus(source.id, STATUS.ready);
            }
        })
    })
    // 重置超时资源池
    this.listene.resetTimeoutSourceList();
}

/**
 * 停止心跳
 */
Heart.prototype.stop = function() {
    this.isLive = false;
    clearInterval(this.handleTimeoutSource);
}

module.exports = Heart