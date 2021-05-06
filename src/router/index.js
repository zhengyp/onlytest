import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/user/List'
import login from '@/components/login'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {path:'/home',name:'Home',component:Home},
    {path:'/',redirect:'/login'},
    {path:'/list',name:'List',component:List},
    {path:'/login',name:'login',component:login}

    

  ]
})

