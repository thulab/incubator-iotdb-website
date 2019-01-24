import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Download from '@/views/Download'
import Documents from '@/views/Documents'
import Community from '@/views/Community'
import Development from '@/views/Development'
import Tools from '@/views/Tools'
import Comming from '@/views/Comming'
import NotFound from "../views/NotFound";
import Test from "@/views/Test";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Download',
      name: 'Download',
      component: Download
    },
    {
      path: '/Documents/:version',
      name: 'Documents',
      component: Documents
    },
    {
      path: '/Tools',
      name: 'Tools',
      component: Tools
    },
    {
      path: '/Community/:content',
      name: 'Community',
      component: Community
    },
    {
      path: '/Development/:content',
      name: 'Development',
      component: Development

    },
    {
      path: '/Comming',
      name: "Comming",
      component: Comming
    },
    {
      path: '/Test',
      name: "Test",
      component: Test
    },
    {
      path: "/404",
      name: "NotFound",
      component: NotFound
    },
    {
      path: "*",
      redirect: "/404"
    }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
      // get Nav bar height
      let yOffset = document.getElementById("bs-example-navbar-collapse-1").clientHeight;
      console.log(yOffset);
      return {
        selector: to.hash,
        offset: {x: 0, y: yOffset}
      }
    } else {
      return { x: 0, y: 0 }
    }
  },
})
