import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/user/List'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/home',name:'Home',component:Home},
    {path:'/',redirect:'/home'},
    {path:'/list',name:'List',component:List}

    

  ]
})

