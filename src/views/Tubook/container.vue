<!--
 * @Author: 情雨随风
 * @Date: 2019-08-03 15:21:19
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-06 00:23:34
 * @Description: container容器区域组件
 -->


<template>
    <div class="container">
        <scorll
            ref="containerwrapper"
            class="containerwrapper"
            :data="article"
        >
            <div class="containerwrapper-content">
                <div class="title">归档列表</div>
                <ul class="list">
                    <li class="listArticle" v-for="(item, v) in article" :key="item.id + v">
                        <div class="content" @click.prevent="openDetails(item.id)">
                            <div class="avatar">
                                <span style="margin-right: 15px;"><a-avatar size="default" :src="item.avatar" /></span>
                                <p class="avatar-name">{{ item.name }}</p>
                            </div>
                            <div style="margin-top: 3px;font-size:10px;padding-left: 5px;">
                                <a-tag
                                    @click.stop="() => {}"
                                    class="tags"
                                    v-for="(s, i) in item.tags"
                                    :key="i"
                                    :color="s.color"
                                >{{ s.name }}</a-tag>
                            </div>
                            <div class="container-viceText">
                                <p class="viceText">{{ item.description }}</p>
                            </div>
                            <div class="icons" @click.stop="() => {}">
                                <span class="iconSpan">
                                    <a-icon type="eye" />
                                    {{ item.read }}
                                </span>
                                <span class="iconSpan" @click.stop="sukiArticle(item.id)">
                                    <a-icon type="like-o" />
                                    {{ item.suki }}
                                </span>
                                <span class="iconSpan">{{ item.createdAt | time }}</span>
                            </div>
                        </div>
                        <img class="picture" @click.prevent="openDetails(item.id)" :src="item.picture" alt="" />
                    </li>
                </ul>
                <iSnone v-if="article.length == 0 && !load"></iSnone>
            </div>
        </scorll>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { imgUrl } from '@/lib/filter';
import scorll from '@cop/common/scorll';
import iSnone from '@cop/common/iSnone';
export default {
    components: { scorll,iSnone },
    computed: {
        ...mapState({
            article: state => state.tubook.article,
            load: state => state.tubook.load
        })
    },
    created() {
        this.Asarticle()
    },
    filters: {
        time(val) {
            return val.slice(0,val.indexOf('T'))
        },
        imgUrl: (val) => imgUrl(val)
    },
    methods: {
        //文章列表
        async Asarticle() {
            try {
                await this.$store.dispatch('tubook/Asarticle')
            } catch (error) {}
        },
        //点赞
        async sukiArticle(id) {
            try {
                await this.api.sukiArticle({ id })
                this.Asarticle()
            } catch (error) {}
        },
        //详情
        openDetails(id) {
            this.$router.push({ path: `/Details/${id}/tubook` })
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    height: 100%;
    background-color: #FFFFFF;//#d3dce6;
    margin: 0 10px;
    padding: 24px;
    overflow: hidden;
    transition: all 200ms;
    position: relative;
    border-radius: 5px;
    @media (max-width: 500px) {
        padding: 10px;
        margin: 0;
        border-radius: 0;
    }
    .containerwrapper {
        height: 100%;
        overflow: hidden;
    }
}
.containerwrapper-content {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    .title {
        background: #333333;
        line-height: 3;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #FFFFFF;
        @media (max-width: 500px) {
            line-height: 3;
        }
    }
    .list {
        margin: 0;
        padding: 0;
    }
    
}
.listArticle {
    display: flex;
    border-bottom: 1px solid #e8e8e8;
    padding: 24px 0;
    cursor: pointer;
    @media (max-width: 500px) {
        padding: 12px 0;
    }
    .picture {
        width: 140px;
        height: 140px;
        margin-left: 24px;
        border-radius: 5px;
        @media (max-width: 500px) {
            display: none;
        }
    }
    .content {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        min-height: 170px;
        .avatar {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 14px;
            @media (max-width: 500px) {
                margin-bottom: 8px;
            }
            .avatar-name {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                @media (max-width: 500px) {
                    font-size: 16px;
                }
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        .tags {
            margin-bottom: 10px;
            @media (max-width: 500px){
                font-size: 1em;
                line-height: 18px;
                height: 18px;
            }
        }
        .container-viceText {
            flex: 1;
            .viceText {
            font-size: 16px;
            color: #999;
            margin-bottom: 0;
            text-indent: 2em;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            max-width: 680px;
            @media (max-width: 500px) {
                    line-height: 1.3;
                    font-size: 14px;
                    -webkit-line-clamp: 3;
                }
            }
        }
        
        .icons {
            margin-top: 10px;
            .iconSpan {
                font-size: 14px;
                margin-right: 15px;
                &:hover {
                    color: #1890ff;
                }
            }
        }
    }

}
</style>
