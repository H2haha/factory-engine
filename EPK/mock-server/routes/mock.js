const router = require('koa-router')()
const data = require('../data')

// router.prefix('/api')

router.get('/tmpt/list', function (ctx, next) {
    ctx.body = data.template.list
})

router.get('/biz/goods', function (ctx, next) {
    ctx.body = data.business.goods
})

module.exports = router