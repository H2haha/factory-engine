const router = require('koa-router')()
const MovieDao = require('../dao/MovieDao')
const MovieBean = require('../bobj/MovieBean')
const Serialize = require('../util/Serialize')

const movieDao = new MovieDao();

/**
 * 热门电影Controller，返回给前端模板所需的业务数据
 */
router.get('/movie/hot', async (ctx, next) => {
  // 从微服务接口获取热映电影json数据
  const result = await movieDao.getHot();
  // 序列化电影对象
  let moviesList = serializeMovies(result.data.subjects);
  // 返回电影列表数据给view视图层
  ctx.body = moviesList;
})

// 根据业务对微服务接口的电影数据重新序列化为对象
function serializeMovies(moviesJson) {
  let moviesList = [];
  moviesJson.forEach(json => {
    json.rating = json.rating.average;
    json.images = json.images.small;
    // 序列化为MovieBean
    moviesList.push(Serialize.toObject(new MovieBean(), json));
  });
  return moviesList;
}

module.exports = router
