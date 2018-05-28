const Pool = require('../src/monitor_pool');

let pool = new Pool();

let source = {
    id: 123456,
    lock: false,
    status: 'ready'
}

pool.register(source);
console.log('注册成功');

// pool.remove(source.id);
// console.log('删除成功');

pool.close();
