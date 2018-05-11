import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
Vue.use(VueRouter);
import Index from './components/Index.vue'
import Login from './components/Login.vue'
// 曝光
import Exposure from './components/exposure/Exposure.vue'
import UpdateExp from './components/exposure/UpdateExp.vue'
import FindExp from './components/exposure/FindExp.vue'
import AddExp from './components/exposure/AddExp.vue'
// 正品优选
import Preferred from './components/preferred/Preferred.vue'
import AddPre from './components/preferred/AddPre.vue'
import UpdatePre from './components/preferred/UpdatePre.vue'
import FindPre from './components/preferred/FindPre.vue'
// banner
import Banner from './components/banner/Banner.vue'
import addBanner from './components/banner/addBanner.vue'
import editBanner from './components/banner/editBanner.vue'
// 评论
import comment from './components/comment/comment.vue'
import findCom from './components/comment/findCom.vue'
import findComs from './components/comment/findComs.vue'
// 反馈
import feedback from './components/feedback/feedback.vue'
import findFee from './components/feedback/findFee.vue'
// 举报
import report from './components/report/report.vue'
import findRep from './components/report/findRep.vue'
const routes = [
    {
        path: '/home',
        name: 'home',
        component: Index,
        children: [{
            path: '/home/preferred',
            name: 'preferred',
            meta: {
            requireAuth: true,
            },
            component: Preferred,
        }, {
            path: '/home/addPre',
            name: 'addPre',
            meta: {
            requireAuth: true,
            },
            component: AddPre,
        },{
            path: '/home/updatePre',
            name: 'updatePre',
            meta: {
            requireAuth: true,
            },
            component: UpdatePre,
        }, {
            path: '/home/findPre',
            name: 'findPre',
            meta: {
            requireAuth: true,
            },
            component: FindPre,
        },{
            path: '/home/updateExp',
            name: 'updateExp',
            meta: {
            requireAuth: true,
            },
            component: UpdateExp,
        }, {
            path: '/home/findExp',
            name: 'findExp',
            meta: {
            requireAuth: true,
            },
            component: FindExp,
        },{
            path: '/home/exposure',
            name: 'exposure',
            meta: {
            requireAuth: true,
            },
            component: Exposure,
        }, {
            path: '/home/addExp',
            name: 'addExp',
            meta: {
            requireAuth: true,
            },
            component: AddExp,
        },{
            path: '/home/banner',
            name: 'banner',
            meta: {
            requireAuth: true,
            },
            component: Banner,
        },{
            path: '/home/addBanner',
            name: 'addBanner',
            meta: {
            requireAuth: true,
            },
            component: addBanner,
        },{
            path: '/home/editBanner',
            name: 'editBanner',
            meta: {
            requireAuth: true,
            },
            component: editBanner,
        },{
            path: '/home/comment',
            name: 'comment',
            meta: {
            requireAuth: true,
            },
            component: comment,
        },{
            path: '/home/findCom',
            name: 'findCom',
            meta: {
            requireAuth: true,
            },
            component: findCom,
        },{
            path: '/home/findComs',
            name: 'findComs',
            meta: {
            requireAuth: true,
            },
            component: findComs,
        },{
            path: '/home/feedback',
            name: 'feedback',
            meta: {
            requireAuth: true,
            },
            component: feedback,
        },{
            path: '/home/findFee',
            name: 'findFee',
            meta: {
            requireAuth: true,
            },
            component: findFee,
        },{
            path: '/home/report',
            name: 'report',
            meta: {
            requireAuth: true,
            },
            component: report,
        },{
            path: '/home/findRep',
            name: 'findRep',
            meta: {
            requireAuth: true,
            },
            component: findRep,
        },{
            path:'/home',
            redirect:'/home/preferred'
        }]
    },
    { 
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path:'/',
        redirect:'/home'
    }
];


// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit("login", window.localStorage.getItem('token'))
}

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login'
 
            })
        }
    }
    else {
        next();
    }
})

export default router;