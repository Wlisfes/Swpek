/*
 * @Author: 情雨随风
 * @Date: 2019-07-30 21:29:19
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-03 22:21:21
 * @Description: 依赖注入
 */

import * as api from '@/api';
import { Button,Row,Col } from 'element-ui';
import { Drawer,Icon,Menu,Tag,List,Avatar,BackTop } from 'ant-design-vue';
import 'element-ui/lib/theme-chalk/display.css';
import 'highlight.js/styles/atom-one-dark.css';
import '@style/common.css';

 
export default {
    install(Vue) {
        Vue.prototype.api = api
        Vue.config.productionTip = false

        Vue.use(Button)
        Vue.use(Row)
        Vue.use(Col)
        

        Vue.use(Drawer)
        Vue.use(Icon)
        Vue.use(Menu)
        Vue.use(Tag)
        Vue.use(List)
        Vue.use(Avatar)
        Vue.use(BackTop)

        Vue.use(Highlight)
    }
}


const Highlight = {
    install(Vue, options) {
        const Hljs = require('highlight.js')
        Vue.directive('highlight', {
            componentUpdated: function(el) {
                let blocks = el.querySelectorAll('pre code');
                for (let i = 0; i < blocks.length; i++) {
                    const item = blocks[i];
                    Hljs.highlightBlock(item);
                };
            }
        })
    }
}