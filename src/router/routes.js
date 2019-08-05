/*
 * @Author: 情雨随风
 * @Date: 2019-07-29 22:19:23
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-05 23:03:28
 * @Description: 路由页面配置
 */

import Index from '@/views/Home/index'

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '情雨随风的青春'
        },
        component: Index
    },
    {
        path: '/Tubook',
        name: 'Tubook',
        meta: {
            title: '情雨随风的青春-归档'
        },
        component: () => import('@/views/Tubook/index.vue')
    },
    {
        path: '/Details/:id/:type',
        name: 'Details',
        component: () => import('@/views/Details/index.vue')
    },
    {
        path: '/Titem',
        name: 'Titem',
        meta: {
            title: '情雨随风的青春-项目'
        },
        component: () => import('@/views/Titem/index.vue')
    },
    {
        path: '/Music',
        name: 'Music',
        meta: {
            title: '情雨随风的青春-音乐'
        },
        component: () => import('@/views/Music/index.vue')
    },
    {
        path: '/Notes',
        name: 'Notes',
        meta: {
            title: '情雨随风的青春-笔记'
        },
        component: () => import('@/views/Notes/index.vue')
    },
    {
        path: '/Chain',
        name: 'Chain',
        meta: {
            title: '情雨随风的青春-友链'
        },
        component: () => import('@/views/Chain/index.vue')
    },
]


export default routes