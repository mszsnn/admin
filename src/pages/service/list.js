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
        key:'img'
    },{
        title: '操作',
        key: 'handle',
        render: (obj, record) => (
            <span>
            <a style={{ marginRight: 10 }}>删除</a>
            <Link to="/admin/service/edit">编辑</Link>
            </span>
        ),
    }];

    let {data}=this.state;
    data.forEach(v=>{
      v.key=v.id;
      
    })
    console.log(data);
    return (
      <AdminSider keys={'service_list'}>
        <Table columns={columns} dataSource={data} />
      </AdminSider>
    )
  }
}
export default ServiceList