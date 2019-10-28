import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
      component: () => import("@/views/index/index.vue"),
      redirect:"/elupload",
      children: [{
          path: '/clipboard',
          name: 'clipboard',
          component: () => import("./views/vue-clipboard2/index.vue")
        },
        {
          path: '/elupload',
          name: 'elupload',
          component: () => import("./views/el-upload/upload.vue")
        },
        {
          path: '/photo',
          name: 'photo',
          component: () => import("./views/vue-photo-preview/index.vue")
        },
      ]
    },
  ]
})