/*
 * @Author: 情雨随风 
 * @Date: 2019-08-18 21:37:32 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-21 22:38:42
 * @Description:  login组件
 */


<template>
    <a-modal
        :visible="visible"
        :footer="null"
        centered
        @cancel="handelcancel"
    >
        <template slot="title">
            <div style="text-align: center;">登录</div>
        </template>
        <a-form
            id="components-form-demo-normal-login"
            layout="horizontal"
            :form="form"
            @submit="handleSubmit">
            <a-form-item>
                <a-input v-decorator="rels.phone" placeholder="phone">
                    <a-iconslot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input v-decorator="rels.password" type="password" placeholder="Password">
                    <a-iconslot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item>
                <Button
                    :loading="load"
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                >登录</Button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import { mapState } from 'vuex';
import { Button } from 'ant-design-vue';
export default {
    components: {
        Button
    },
    computed: {
        ...mapState({
            load: state => state.music.load
        })
    },
    props: {
        visible: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            form: this.$form.createForm(this),
            rels: {
                phone: [
                    'phone',
                    {rules: [
                        { required: true, message: '手机号不能为空!' }
                    ]}
                ],
                password: [
                    'password',
                    {rules: [
                        { required: true, message: '密码不能为空!' }
                    ]}
                ]
            }
        }
    },
    methods: {
        handelcancel() {
            this.$emit('cancel')
        },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields(async (err, values) => {
                if (!err) {
                    try {
                        await this.$store.dispatch('music/AsLogin', values)
                    } catch (error) {}
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>

</style>