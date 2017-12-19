import React from "react"
import { Redirect } from 'react-router-dom'
import AdminSider from '../../components/sider.jsx';
import { Form, Input, Button,message } from 'antd';
import Editor from "./Editor";
const FormItem = Form.Item;


class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values=JSON.stringify(values);
                fetch('/api/team/update',{
                    "method":'post',
                    "body":values,
                    "headers":{
                        "Content-Type":"application/json"
                    }
                }).then(r => r.text()).then(res => {
                    if(res==='ok'){
                        message.success("修改成功");
                        this.props.data();
                    }else{
                        message.warning("修改失败");
                    }
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 24,
                    offset: 3
                },
            },
        };
        const fu = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            },
        };

        const c={
            action:"/public/upload",
            content:this.props.props.introduce,
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="成员ID"
                >
                    {getFieldDecorator('id',{
                        initialValue: this.props.props.id
                    })(
                        <Input type="text" readOnly />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="成员姓名"
                >
                    {getFieldDecorator('name', {
                        initialValue: this.props.props.name,
                        rules: [{
                            required: true, message: 'Please input your name!',
                            max:10,message:"请输入10个字符以内"
                        }],
                    })(
                        <Input type="text" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="英文姓名"
                >
                    {getFieldDecorator('ename', {
                        initialValue: this.props.props.ename,
                        rules: [{
                            required: true, message: '请输入英文姓名!',
                            max:10,message:"请输入10个字符以内"
                        }],
                    })(
                        <Input type="text" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="成员职位"
                >
                    {getFieldDecorator('position', {
                        initialValue: this.props.props.position,
                        rules: [{
                            required: true, message: '请输入职位!',
                            max:10,message:"请输入10个字符以内"
                        }],
                    })(
                        <Input type="text" />
                    )}
                </FormItem>
                <FormItem
                    {...fu}
                    label="成员介绍"
                >
                    {getFieldDecorator('introduce', {
                        initialValue: this.props.props.introduce,
                    })(
                        <Editor {...c}></Editor>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);



class TeamEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            isSussess:false
        }
        this.changeSuccess=this.changeSuccess.bind(this)
    }
    changeSuccess(){
        this.setState({
            isSussess:true
        })
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        fetch('/api/team/showone?id=' + id).then(r => r.json()).then(res => {
            this.setState({
                data: res[0]
            })
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.isSussess ? <Redirect to="/admin/team/list"/> :  <AdminSider keys={'team_Edit'}>
                        <WrappedRegistrationForm props={this.state.data} data={this.changeSuccess}></WrappedRegistrationForm>
                    </AdminSider>
                }
            </div>
        )
    }
}
export default TeamEdit;