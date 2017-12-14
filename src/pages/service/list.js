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
    this.handleDelete = this.handleDelete.bind(this);   
  }
  componentDidMount() {
    fetch('/api/service/show').then(r=>r.json()).then(res=>{
       this.setState({
        data:res
       })
    })
  }
<<<<<<< HEAD
  fetchData(){
    fetch('/api/service/show').then(r=>r.json()).then(res=>{
      this.setState({
       data:res
      })
   })
  }
=======
>>>>>>> 083e52d1a10bdd3775c05a1b6962e3e2c7495ae9
  handleDelete(v){
    fetch('/api/service/del?id='+v).then(r=>r.text()).then(r=>{
        if(r==="ok"){
          message.success('删除成功',1);
<<<<<<< HEAD
          this.fetchData();
        }
    })
  }
=======
          let data  = this.state.data.filter(element=>element.id != v);
          this.setState({
            data:data
           })
        }
    })
  }



>>>>>>> 083e52d1a10bdd3775c05a1b6962e3e2c7495ae9
  render() {
    let {data}=this.state;
    data.forEach(v=>{
      v.key=v.id;
      
    })
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
<<<<<<< HEAD
          <span>
            <a style={{ marginRight: 10 }} onClick={()=>{this.handleDelete(obj.id)}}>删除</a>
            <Link to="/admin/service/edit" id = {obj.id}>编辑</Link>
          </span>
        ),
    }];
=======
            <span>
            <a style={{ marginRight: 10 }} onClick={()=>{this.handleDelete(obj.id)}}>删除</a>
            <Link to="/admin/service/edit">编辑</Link>
            </span>
        ),
    }];

    let {data}=this.state;
    data.forEach(v=>{
      v.key=v.id;
      
    })
>>>>>>> 083e52d1a10bdd3775c05a1b6962e3e2c7495ae9
    return (
      <AdminSider keys={'service_list'}>
        <Table columns={columns} dataSource={data} />
      </AdminSider>
    )
  }
}
export default ServiceList