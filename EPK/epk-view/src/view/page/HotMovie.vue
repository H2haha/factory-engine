<template>
  <div id="movieList" class="list" :class="className">
      <!-- 模板填充部分 -->
  </div>
</template>

<script type="text/ecmascript-6">
import {ListTmptDao} from '../../framework/dao/ListTmptDao'
import {MovieDao} from '../../framework/dao/MovieDao'
import {ListTmptParser} from '../../framework/parse/ListTmptParser'

// list模板dao获取模板数据
const listTmptDao = new ListTmptDao();
// 电影dao获取热门电影数据
const movieDao = new MovieDao();
// 列表模板解析器
const listTmptParser = new ListTmptParser();

export default {
  data () {
    return {
      moviesList: [],
      styleId: ''
    }
  },
  created () {
    listTmptDao.getListTmptData().then(res => {
      this.styleId = res.data.styleId;
    })
  },
  computed: {
    // 根据styleId选择不同的样式
    className () {
      switch (this.styleId) {
        case 1:
          return 'one';
        case 2:
          return 'two';
        default:
          break;
      }
    }
  },
  mounted () {
    // 获取电影数据
    movieDao.getHot().then(resMovie => {
      // 挂载到<template>下面
      this.handleParse(resMovie.data);
    })
  },
  methods: {
    handleParse (movieData) {
      document.getElementById('movieList').innerHTML = listTmptParser.parsing(movieData)
    }
  }
}
</script>

<style scopeds lang="stylus">
  .list.one
    background: #f8f8f8
    .movie
      background: #ffffff
      margin: 5px 0
      padding: 5px 10px
      width:100px
      float:left
      .cover
        width: 60px
        height: 90px
      .info
        margin:10px
        .title
          color: rgb(7, 17, 27)
          margin-bottom: 10px
          font-size: 16px
  .list.two
    text-align: center
    background: #f8f8f8
    .movie
      background: #ffffff
      padding: 10px
      width: 100px
      height: 180px
      float left
      .cover
        width: 100%
      .info
        .rating, .year
          display: none
</style>
