import React from "react"
import AdminSider from '../../components/sider.jsx';
import { Form, Input, Button,message ,Upload, Icon} from 'antd';
import { Redirect } from 'react-router-dom'
const FormItem = Form.Item;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        values.img = this.props.props.img;         
        if (!err) {
        values=JSON.stringify(values);
        fetch('/api/service/add',{
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
    
  
    // upload img
    const fileList = [];
      const props = {
        action: '/api/service/upload',
        onChange:this.handleChange, 
        listType: 'picture',
        defaultFileList: [...fileList],
      };
    //   upload img list
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="服务名称" 
        >
          {getFieldDecorator('title', {
            initialValue: this.props.props.title,
            rules: [{
              required: true, message: '请输入服务标题!',
              max:30,message:"请输入30个字符以内"
            }],
          })(
            <Input type="text" />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="服务英文标题"
        >
          {getFieldDecorator('subtitle', {
            initialValue: this.props.props.engtitle,
            rules: [{
              required: true, message: '请输入服务的英文标题!',
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



class ServiceAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {title:'',subtitle:'',img:''},
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
          this.state.isSussess ? <Redirect to="/admin/service/list"/> :  <AdminSider keys={'service_add'}>
          <WrappedRegistrationForm props={this.state.data} data={this.changeSuccess}></WrappedRegistrationForm>
        </AdminSider>
        }
      </div>
    )
  }
}
export default ServiceAdd