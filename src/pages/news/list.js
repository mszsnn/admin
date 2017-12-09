import React from "react"
import AdminSider from '../../components/sider.jsx';
import { Table ,message} from 'antd';
import { Link } from 'react-router-dom';


class NewsList extends React.Component {
  constructor(){
    super();
    this.state={
        data:[]
    }
    this.handleDelete=this.handleDelete.bind(this);
  }
  componentDidMount() {
    fetch('/api/news/show').then(r=>r.json()).then(res=>{
       this.setState({
        data:res
       })
    })
  }
  handleDelete(v){
    fetch('/api/news/del?id='+v).then(r=>r.text()).then(r=>{
        if(r==="ok"){
          message.success('删除成功',1);
          this.setState({
            data:[]
           })
        }
    })
  }


  render() {
    
const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '标题',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '英文标题',
  dataIndex: 'engtitle',
  key: 'engtitle',
}, {
  title: '新闻描述',
  dataIndex: 'description',
  key: 'description',
}, {
  title: '发布时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '浏览量',
  dataIndex: 'count',
  key: 'count',
}, {
  title: 'handle',
  key: 'handle',
  render: (obj, record) => (
    <span>
      <a style={{ marginRight: 10 }} onClick={()=>{this.handleDelete(obj.id)}}>删除</a>
      <Link to="/admin/news/edit">编辑</Link>
    </span>
  ),
}];

    let {data}=this.state;
    data.forEach(v=>{
      v.key=v.id;
      
    })
    return (
      <AdminSider keys={'news_list'}>
        <Table columns={columns} dataSource={data} />
      </AdminSider>
    )
  }
}
export default NewsList