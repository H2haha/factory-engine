/**
 * 启动心跳
 * 1、初始化心跳
 * 2、启动心跳
 */


const Heart = require('./heart');

// 初始化心跳
let heart = new Heart();

// 启动心跳
heart.beat();
