/*
 * @Author: 情雨随风
 * @Date: 2019-07-30 22:55:20
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-05 23:10:17
 * @Description: api
 */


import http from '@/lib/http'

const BINGHTTP = process.env.NODE_ENV === "production" ? "" : "/bing"
const KSTHTTP = process.env.NODE_ENV === "production" ? "" : "/api"


/**
 * bing每日壁纸
 * @param {*} props 
 */
export const wallpaper = props => http.get({
    baseURL: `${BINGHTTP}/bing`,
    url: '/HPImageArchive.aspx',
    params: props
})

/**
 * 获取标签列表
 * @param {*} props 
 */
export const openTags = props => http.get({
    baseURL: `${KSTHTTP}/api`,
    url: '/all/open/tags',
    params: props
})

/**
 * 获取归档文章
 * @param {*} props 
 */
export const openArticle = props => http.get({
    baseURL: `${KSTHTTP}/api`,
    url: '/all/open/article',
    params: props
})

/**
 * 根据标签获取文章
 * @param {*} props 
 */
export const openTagsArticle = props => http.get({
    baseURL: `${KSTHTTP}/api`,
    url: '/all/tags/article',
    params: props
})

/**
 * 文章点赞
 * @param {*} props 
 */
export const sukiArticle = props => http.get({
    baseURL: `${KSTHTTP}/api`,
    url: '/suki/article',
    params: props
})

/**
 * 文章详情
 * @param {*} props 
 */
export const ArticleDetails = props => http.get({
    baseURL: `${KSTHTTP}/api`,
    url: '/id/article',
    params: props
})

/**
 * 获取项目
 * @param {*} props 
 */
export const openTaske = props => http.get({
    baseURL: `${KSTHTTP}/api`,
    url: '/all/open/taske',
    params: props
})

/**
 * 项目点赞
 * @param {*} props 
 */
export const sukiTaske = props => http.get({
    baseURL: `${KSTHTTP}/api`,
    url: '/suki/taske',
    params: props
})

/**
 * 获取开放笔记
 * @param {*} props 
 */
export const openBook = props => http.get({
    baseURL: `${KSTHTTP}/api`,
    url: '/all/open/book',
    params: props
})

/**
 * 根据标签获取笔记
 * @param {*} props 
 */
export const openTagsBook = props => http.get({
    baseURL: `${KSTHTTP}/api`,
    url: 'all/tags/book',
    params: props
})

/**
 * 笔记详情
 * @param {*} props 
 */
export const BookDetails = props => http.get({
    baseURL: `${KSTHTTP}/api`,
    url: '/id/book',
    params: props
})