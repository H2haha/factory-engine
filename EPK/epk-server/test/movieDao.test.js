const MovieDao = require('../dao/MovieDao');
const movieDao = new MovieDao();
// nodejs断言模块
const assert = require('assert');

// 测试获取正在热映的电影列表
movieDao.getHot().then(res => {
    assert.equal(res.status, 200);
})

// 测试根据id获取电影详情
movieDao.getById(27065636).then(res => {
    assert.equal(res.status, 200);
})
