import  { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import styles from './index.less'

const FormItem = Form.Item;

@Form.create()
@connect(({ global, loading }) => ({
    user: global.user,
    loading: loading.effects['user/updateUserInfo']
}))
export default class MineSetting extends Component {
    constructor(props) {
        super(props);
        const { dispatch, user } = props;
        if (!user.id || !user.status) return dispatch(routerRedux.replace('/exception'))
    }
    handleSubmit = () => {
        const { form, dispatch, user } = this.props;
        const { validateFieldsAndScroll } = form;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({ type: 'user/updateUserInfo', params: { ...values, userid: user.id } })
            }
        })

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { user, loading } = this.props;
        console.log(user)
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            },
        };
        const reg = /^1[34578][0-9]{9}$/;
        return (
            <div className={styles.list}  >
                <Form className={styles.userForm} onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label='昵称'
                    >
                        {getFieldDecorator('nick', {
                            initialValue: user.nick,
                            rules: [{ required: true, message: '请输入昵称', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='学名'
                    >
                        {getFieldDecorator('realname', {
                            initialValue: user.realname,
                            rules: [{ required: true, message: '请输入学名', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='年龄'
                    >
                        {getFieldDecorator('age', {
                            initialValue: user.age,
                            rules: [{ required: true, message: '请输入您的年龄', whitespace: true }],
                        })(
                            <Input type='number' />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='年级'
                    >
                        {getFieldDecorator('grade', {
                            initialValue: user.grade,
                            rules: [{ required: true, message: '请输入您的年级', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='手机号'
                    >
                        {getFieldDecorator('phone', {
                            initialValue: user.phone,
                            rules: [
                                { required: true, message: '请输入您的手机号', whitespace: true },
                                { pattern: reg, message: '请输入正确的手机号', whitespace: true }
                            ],
                        })(
                            <Input type='phone' />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='地址'
                    >
                        {getFieldDecorator('address', {
                            initialValue: user.address,
                            rules: [{ required: true, message: '请输入您的地址', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button loading={loading} type="primary" htmlType="submit">保存</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}