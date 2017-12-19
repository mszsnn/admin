import React from "react"
import { Redirect } from 'react-router-dom'
import AdminSider from '../../components/sider.jsx';
import { Form, Input, Button,message } from 'antd';
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
                fetch('/api/case/update',{
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
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="案例ID"
                >
                    {getFieldDecorator('id',{
                        initialValue: this.props.props.id
                    })(
                        <Input type="text" readOnly />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="中文名称"
                >
                    {getFieldDecorator('titleCh', {
                        initialValue: this.props.props.titleCh,
                        rules: [{
                            required: true, message: 'Please input your name!',
                            max:30,message:"请输入30个字符以内"
                        }],
                    })(
                        <Input type="text" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="英文名称"
                >
                    {getFieldDecorator('titleEn', {
                        initialValue: this.props.props.titleEn,
                        rules: [{
                            required: true, message: '请输入英文名称!',
                            max:30,message:"请输入50个字符以内"
                        }],
                    })(
                        <Input type="text" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="更新时间"
                >
                    {getFieldDecorator('upDateTime', {
                        initialValue: this.props.props.upDateTime,
                        rules: [{
                            required: true, message: '请输入更新时间!',
                            max:30,message:"请输入30个字符以内"
                        }],
                    })(
                        <Input type="text" />
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
        fetch('/api/case/showone?id=' + id).then(r => r.json()).then(res => {
            this.setState({
                data: res[0]
            })
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.isSussess ? <Redirect to="/admin/case/list"/> :  <AdminSider keys={'case_Edit'}>
                        <WrappedRegistrationForm props={this.state.data} data={this.changeSuccess}></WrappedRegistrationForm>
                    </AdminSider>
                }
            </div>
        )
    }
}
export default TeamEdit;