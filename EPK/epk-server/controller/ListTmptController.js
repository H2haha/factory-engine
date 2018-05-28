/**
 * List模板控制器
 */

const router = require('koa-router')();
const ListTmptEngine = require('../framework/template/ListTmptEngine');
const ListTmptDao = require('../dao/ListTmptDao');
// list模板数据dao
const listTmptDao = new ListTmptDao();
// list模板引擎
const listTmptEngine = new ListTmptEngine();

router.prefix('/tmpt');

/**
 * 获取list模板数据的控制器
 */
router.get('/list', async (ctx, next) => {
    // 从微服务获取模板数据
    const result = await listTmptDao.getTmptData();
    // 模板引擎解析
    const listTmptData = listTmptEngine.parsing(result.data);
    // 返回数据给view视图层
    ctx.body = listTmptData;
})

module.exports = router;
