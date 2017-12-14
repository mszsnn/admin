import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './login.css'
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
        var values = JSON.stringify(values);
      if (!err) {
        fetch('/api/login/check',{
            "method":"post",
            "body":values,
            "headers":{
                "Content-Type": "application/json"
            }
        }).then(r=>r.text()).then(res=>{
            console.log(res);
        })
        // .then(r=>r.json()).then(res=>{
        //      console.log(res);
        // })
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
  render(){
    return (
      <div>
        <LoginF/>
      </div>
    )
  }
}


export default Login