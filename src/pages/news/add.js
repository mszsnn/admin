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
        console.log(values);
        values=JSON.stringify(values);
        fetch('/api/news/add',{
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
          label="新闻标题"
        >
          {getFieldDecorator('title', {
            initialValue: this.props.props.title,
            rules: [{
              required: true, message: 'Please input your title!',
              max:30,message:"请输入30个字符以内"
            }],
          })(
            <Input type="text" />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新闻英文标题"
        >
          {getFieldDecorator('engtitle', {
            initialValue: this.props.props.engtitle,
            rules: [{
              required: true, message: '请输入英文标题!',
              max:30,message:"请输入30个字符以内"
            }],
          })(
            <Input type="text" />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新闻描述"
        >
          {getFieldDecorator('description', {
            initialValue: this.props.props.description,
            rules: [{
              required: true, message: '请输入描述!',
              max:50,message:"请输入50个字符以内"
            }],
          })(
            <Input type="text" />
            )}
        </FormItem>
        <FormItem
          {...fu}
          label="新闻内容"
        >
          {getFieldDecorator('content', {
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



class NewsAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {title:'',engtitle:'',description:'',content:''},
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
          this.state.isSussess ? <Redirect to="/admin/news/list"/> :  <AdminSider keys={'news_add'}>
          <WrappedRegistrationForm props={this.state.data} data={this.changeSuccess}></WrappedRegistrationForm>
        </AdminSider>
        }
      </div>
    )
  }
}
export default NewsAdd