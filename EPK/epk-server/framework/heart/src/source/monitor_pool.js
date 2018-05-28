/**
 * 监控池封装
 * 1、初始化配置文件
 * 2、创建监控池对象
 * 3、分装资源
 * 4、将资源注册到监控池中
 */

// 导入资源配置、初始化配置文件
const SOURCE_CONFIG = require('../../config/source.conf');
// 导入资源类
const Source = require('./source');
// 导入监控池类
const Pool = require('./pool');



// 创建监控池对象
const pool = new Pool();
// 封装资源
const sourceList = SOURCE_CONFIG.source.map((source => new Source(source)));

// 将资源注册到监控池中
pool.register(sourceList);
console.log('资源注册成功');



// 通过http协议完成master和slave的通信
const Koa = require('koa');
const app = new Koa();
app.use(async ctx => {
    const key = ctx.request.query.key;
    ctx.body = await pool.get(key) + '\n';
});
app.listen(3006);
console.log('master node server start');
