import React from "react"
import AdminSider from '../../components/sider.jsx';
import { Table ,message} from 'antd';
import { Link } from 'react-router-dom';

class ServiceList extends React.Component {
  constructor(){
    super();
    this.state={
        data:[]
    }
  }
  componentDidMount() {
    fetch('/api/service/show').then(r=>r.json()).then(res=>{
       this.setState({
        data:res
       })
    })
  }
  handleDelete(v){
    fetch('/api/service/del?id='+v).then(r=>r.text()).then(r=>{
        if(r==="ok"){
          message.success('删除成功',1);
          let data  = this.state.data.filter(element=>element.id != v);
          this.setState({
            data:data
           })
        }
    })
  }



  render() {
    const columns = [{
        title:'ID',
        dataIndex:'id',
        key:'id',
    },{
        title:'服务名称',
        dataIndex:'title',
        key:'title',
    },{
        title:'英文名称',
        dataIndex:'subtitle',
        key:'subtitle',
    },{
        title:'宣传图',
        dataIndex:'img',
        key:'img',
        render: (obj, record) => (
          <img width='80' src={obj} />
      ), 
    },{
        title: '操作',
        key: 'handle',
        render: (obj, record) => (
            <span>
            <a style={{ marginRight: 10 }} onClick={()=>{this.handleDelete(obj.id)}}>删除</a>
            <Link to={"/admin/service/edit/"+obj.id}>编辑</Link>
            </span>
        ),
    }];
  
    let {data}=this.state;
    data.forEach(v=>{
      v.key=v.id; 
    })
    return (
      <AdminSider keys={'service_list'}>
        <Table columns={columns} dataSource={data} />
      </AdminSider>
    )
  }
}
export default ServiceList