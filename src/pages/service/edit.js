import React from "react"
import { Redirect } from 'react-router-dom'
import AdminSider from '../../components/sider.jsx';
import {Form, Input, Button,message ,Upload, Icon } from 'antd';
const FormItem = Form.Item;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.img = this.props.props.img;
        values=JSON.stringify(values);
        fetch('/api/service/update',{
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
  handleChange = (e) =>{
    if(e.file){
      this.props.props.img = e.file.response;
    }
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
      content:this.props.props.content,
    }
 // upload img
  const fileList = [

  ];
  const props = {
    action: '/api/service/upload',
    listType: 'picture',
    onChange:this.handleChange, 
    defaultFileList: [...fileList],
  };
//   upload img list

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="服务ID"
        >
          {getFieldDecorator('id',{
             initialValue: this.props.props.id
          })(
            <Input type="text" readOnly />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="服务名称"
        >
          {getFieldDecorator('title', {
            initialValue: this.props.props.title,
            rules: [{
              required: true, message: '请输入服务名称!',
              max:30,message:"请输入30个字符以内"
            }],
          })(
            <Input type="text" />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="服务英文名称"
        >
          {getFieldDecorator('subtitle', {
            initialValue: this.props.props.subtitle,
            rules: [{
              required: true, message: '请输入服务的英文名称!',
              max:30,message:"请输入30个字符以内"
            }],
          })(
            <Input type="text" />
            )}
        </FormItem>
        <FormItem  {...formItemLayout}
          label="上传图片">
           {getFieldDecorator('img', {
            initialValue: this.props.props.img,
            rules: [{
              required: true, message: '请选择文件!',
            }],
          })(
            <Upload {...props}>
                <Button>
                    <Icon type="upload" /> upload
                </Button>
             </Upload>
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



class ServiceEdit extends React.Component {
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
    fetch('/api/service/showone?id=' + id).then(r => r.json()).then(res => {
      this.setState({
        data: res[0]
      })
    })
  }
  render() {
    return (
      <div>
        {
          this.state.isSussess ? <Redirect to="/admin/service/list"/> :  <AdminSider keys={'service_Edit'}>
          <WrappedRegistrationForm props={this.state.data} data={this.changeSuccess}></WrappedRegistrationForm>
        </AdminSider>
        }
      </div>
    )
  }
}
export default ServiceEdit