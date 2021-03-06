import React from "react"
import AdminSider from '../../components/sider.jsx';
import {Form, Input, Button, message, Upload, Icon,DatePicker} from 'antd';
import {Redirect} from 'react-router-dom'
const FormItem=Form.Item;


class RegistrationForm extends React.Component {
    state={
        confirmDirty: false,
    };
    handleSubmit=(e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values=JSON.stringify(values);
                fetch('/api/case/add', {
                    "method": 'post',
                    "body": values,
                    "credentials": 'include',
                    "headers": {
                        "Content-Type": "application/json"
                    }
                }).then(r => r.text()).then(res => {
                    if (res === 'ok') {
                        message.success("添加成功");
                        this.props.data();
                    } else {
                        message.warning("添加失败");
                    }
                })
            }
        });
    };
    handleChange = (e) =>{
        if(e.file){
           // this.props.props.img = e.file.response;
        }
    }
    render() {
        const {getFieldDecorator}=this.props.form;
        const formItemLayout={
            labelCol: {
                xs: {span: 24},
                sm: {span: 3},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 10},
            },
        };
        const tailFormItemLayout={
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
        const fu={
            labelCol: {
                xs: {span: 24},
                sm: {span: 3},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 21},
            },
        };

        const c={
            action: "/public/upload",
        };
        const fileList=[];
        const props={
            action: '/api/case/upload',
            listType: 'picture',
            onChange:this.handleChange,
            defaultFileList: [...fileList],
            withCredentials:true
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="中文名称"
                >
                    {getFieldDecorator('titleCh', {
                        rules: [{
                            required: true, message: '请输入中文名称!',
                            max: 10, message: "请输入20个字符内"
                        }],
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="英文名称"
                >
                    {getFieldDecorator('titleEn', {
                        rules: [{
                            required: true, message: '请输入英文名称!',
                            max: 10, message: "请输入10个字符以内"
                        }],
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="更新时间"
                >
                    {getFieldDecorator('upDateTime', {
                        rules: [{
                            required: true, message: '请输入更新时间!'
                        }],
                    })(
                        <DatePicker/>
                    )}
                </FormItem>
                <FormItem  {...formItemLayout}
                           label="上传图片">
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload"/> upload
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm=Form.create()(RegistrationForm);


class TeamAdd extends React.Component {
    constructor() {
        super();
        this.state={
            data: {titleCH: '', titleEn: '', img: '', upDateTime: ''},
            isSuccess: false
        }
        this.changeSuccess=this.changeSuccess.bind(this)
    }

    changeSuccess() {
        this.setState({
            isSussess: true
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.isSussess ? <Redirect to="/admin/case/list"/> : <AdminSider keys={'case_add'}>
                        <WrappedRegistrationForm props={this.state.data}
                                                 data={this.changeSuccess}></WrappedRegistrationForm>
                    </AdminSider>
                }
            </div>
        )
    }
}
export default TeamAdd;
