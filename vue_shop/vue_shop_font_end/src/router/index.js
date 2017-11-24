import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Image from '@/views/Image'
import Title from '@/views/Title'

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList,
    }
  ]
})
