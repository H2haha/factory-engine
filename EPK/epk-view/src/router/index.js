import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../view/template/HelloWorld'
import HotMovie from '../view/page/HotMovie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/movie/hot',
      name: 'HotMovie',
      component: HotMovie
    }
  ]
})
