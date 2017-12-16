import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd';
import { message} from 'antd';
import './login.css'
import { fn } from 'moment';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class LoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values = JSON.stringify(values);
      if (!err) {
        fetch('/api/login/check',{
            "method":"post",
            "body":values,
            "headers":{
                "Content-Type": "application/json"
            }
        }).then(r=>r.text()).then(res=>{
            if(res == 1){
              message.success('登陆成功');
               this.props.data();          
              // this.props.history.push('/admin/service/add')              
              // Router.push('/admin/service/add');
            }else{
              message.warning('登陆失败，请重新输入');              
            }
        })
        
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  
    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
  
    return (
      <div className='box'>
        <header className='header'>
        <div className='content'>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem
              validateStatus={usernameError ? 'error' : ''}
              help={usernameError || ''}
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username" />
              )}
            </FormItem>
            <FormItem
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
        </header>
        <section className='footer'></section>
     </div>
    );
  }
}


const LoginF = Form.create()(LoginForm);
class Login extends React.Component{
  constructor(){
    super();
    this.state={
      login:false
    }
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(){
    this.setState({login:true});
  }
  render(){
    return (
      <div>
        {
          this.state.login ? <Redirect to="/admin/service/list"/> : <LoginF data={this.handleLogin}/>
        }
       
      </div>
    )
  }
}


export default Login