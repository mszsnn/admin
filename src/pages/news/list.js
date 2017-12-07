import React from "react"
import AdminSider from '../../components/sider.jsx';
import { Table, Icon, Divider } from 'antd';

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
  },{
    title: '新闻描述',
    dataIndex: 'description',
    key: 'description',
  },{
    title: '发布时间',
    dataIndex: 'inputtime',
    key: 'inputtime',
  },{
    title: '浏览量',
    dataIndex: 'count',
    key: 'count',
  },{
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  }, {
    title: 'count',
    key: 'description',
    render: (text, record) => (
      <span>
        <a href="#">Action 一 {record.name}</a>
        <Divider type="vertical" />
        <a href="#">Delete</a>
        <Divider type="vertical" />
        <a href="#" className="ant-dropdown-link">
          More actions <Icon type="down" />
        </a>
      </span>
    ),
  }];
  
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }];








class NewsList extends React.Component{
    render(){
        return (
            <AdminSider keys={'news_list'}>
                <Table columns={columns} dataSource={data} />
            </AdminSider>
        )
    }
}
export default NewsList