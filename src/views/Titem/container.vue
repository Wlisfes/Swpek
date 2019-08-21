<!--
 * @Author: 情雨随风
 * @Date: 2019-08-04 22:27:54
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-06 00:23:20
 * @Description: 项目列表组件
 -->


<template>
    <div class="container">
        <scorll
            ref="containerwrapper"
            class="containerwrapper"
            :data="Titem"
        >
            <div class="containerwrapper-content">
                <div class="title">项目列表</div>
                <ul class="list">
                    <li class="container-li" v-for="(item, v) in Titem" :key="item.id + v">
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
                                <a :href="item.github" target="_blank">
                                    GitHub
                                    <a-icon type="github" />
                                </a>
                            </span>
                            <span class="iconSpan" v-if="item.viewUrl != item.github">
                                <a :href="item.viewUrl" target="_blank">
                                    View
                                    <a-icon type="eye" />
                                </a>
                            </span>
                            <span class="iconSpan" @click.stop="sukiTaske(item.id)">
                                <a-icon type="like-o" />
                                {{ item.suki }}
                            </span>
                            <span class="iconSpan">{{ item.createdAt | time }}</span>
                        </div>
                    </li>
                </ul>
                <iSnone v-if="Titem.length == 0 && !load"></iSnone>
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
    components: {
        scorll,iSnone
    },
    computed: {
        ...mapState({
            Titem: state => state.titem.Titem,
            load: state => state.titem.load
        })
    },
    filters: {
        time(val) {
            return val.slice(0,val.indexOf('T'))
        },
        imgUrl: (val) => imgUrl(val)
    },
    created() {
        this.AsTitem()
    },
    methods: {
        //项目列表
        async AsTitem() {
            try {
                await this.$store.dispatch('titem/AsTitem')
            } catch (error) {}
        },
        //点赞
        async sukiTaske(id) {
            try {
                await this.api.sukiTaske({ id })
                this.AsTitem()
            } catch (error) {}
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    height: 100%;
    background-color: #FFFFFF;
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
.container-li {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #e8e8e8;
    padding: 24px 0;
    cursor: pointer;
    min-height: 225px;
    @media (max-width: 500px) {
        padding: 12px 0;
        min-height: 200px;
    }
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
            color: rgba(0,0,0,.65);
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
            color: rgba(0, 0, 0, 0.65);
            &:hover {
                color: #1890ff;
            }
            a {
                color: rgba(0, 0, 0, 0.65);
                &:hover {
                    color: #1890ff;
                }
            }
        }
    }
}
</style>
