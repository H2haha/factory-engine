const Heart = require('../src/slave/heart');

// 初始化心跳实例
const heart = new Heart();

// 启动心跳
heart.beat();

// 指定心跳业务
setTimeout(() => {
    heart.setJob(myJob);
}, 3000);
// 心跳业务
function myJob() {
    console.log(new Date().getTime());
}

// 更换心跳业务
setTimeout(() => {
    heart.setJob(function () {
        console.log('hello nodejs');
    });
}, 6000);

// 指定非函数为job不会执行
setTimeout(() => {
    heart.setJob('xintiao')
}, 8000);

// 停止心跳
setTimeout(() => {
    heart.stop();
}, 10000);