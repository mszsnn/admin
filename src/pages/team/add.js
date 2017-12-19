import React from "react"
import AdminSider from '../../components/sider.jsx';
import { Form, Input, Button,message } from 'antd';
import Editor from "./Editor";
import { Redirect } from 'react-router-dom'
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
                fetch('/api/team/add',{
                    "method":'post',
                    "body":values,
                    "headers":{
                        "Content-Type":"application/json"
                    }
                }).then(r => r.text()).then(res => {
                    if(res==='ok'){
                        message.success("添加成功");
                        this.props.data();
                    }else{
                        message.warning("添加失败");
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
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="成员姓名"
                >
                    {getFieldDecorator('name', {
                        initialValue: this.props.props.title,
                        rules: [{
                            required: true, message: 'Please input your title!',
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
                        initialValue: this.props.props.engtitle,
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
                        initialValue: this.props.props.description,
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
                        initialValue: this.props.props.content,
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



class TeamAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {name:'',ename:'',position:'',introduce:''},
            isSuccess:false
        }
        this.changeSuccess=this.changeSuccess.bind(this)
    }
    changeSuccess(){
        this.setState({
            isSussess:true
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.isSussess ? <Redirect to="/admin/team/list"/> :  <AdminSider keys={'team_add'}>
                        <WrappedRegistrationForm props={this.state.data} data={this.changeSuccess}></WrappedRegistrationForm>
                    </AdminSider>
                }
            </div>
        )
    }
}
export default TeamAdd;