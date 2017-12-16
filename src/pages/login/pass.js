import React from "react"
import AdminSider from '../../components/sider.jsx';
import { Form, Input, Button,message } from 'antd';
const FormItem = Form.Item;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('pass')) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        values=JSON.stringify(values);
        fetch('/api/login/changepass',{
          "method":'post',
          "body":values,
          "headers":{
            "Content-Type":"application/json"
          }
        }).then(r => r.text()).then(res => {
          if(res==='ok'){
            message.success("修改成功");
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
        sm: { span: 6 },
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
          label="用户"
        >
          {getFieldDecorator('user', {
            initialValue: this.props.props.user
          })(
            <Input type="text" readOnly />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
        >
          {getFieldDecorator('pass', {
            rules: [{
              required: true, message: '请输入密码!',
              max:15,message:"请输入15个字符以内"
            }],
          })(
            <Input type="password" />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator('passtwo', {
            rules: [{
              required: true, message: '请再次输入密码!',
              max:15,message:"请输入15个字符以内",
              
            },
            {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" />
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



class Pass extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {user:'',pass:'',passtwo:''}
    }
  }
  componentDidMount(){
    sessionStorage.user='admin';
    if(sessionStorage.user){
      this.setState({
        data: {user:'admin',pass:'',passtwo:''}
      }) 
    }
  }
  render() {
    return (
      <AdminSider keys={'Pass'}>
        <WrappedRegistrationForm  props={this.state.data}></WrappedRegistrationForm>
      </AdminSider>
    )
  }
}
export default Pass