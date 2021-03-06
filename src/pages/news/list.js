import React from "react"
import AdminSider from '../../components/sider.jsx';
import { Table, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import Editor from "./Editor";


class NewsList extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    fetch('/api/news/show').then(r => r.json()).then(res => {
      console.log(res);
      this.setState({
        data: res
      })
    })
  }
  handleDelete(v) {
    fetch('/api/news/del?id=' + v).then(r => r.text()).then(r => {
      if (r === "ok") {
        message.success('删除成功', 1);
        let index=this.state.data.findIndex(val=>val.id===v);
        let arr=[...this.state.data];
        arr.splice(index,1);
        this.setState({
          data: arr
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
          <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => { this.handleDelete(obj.id) }}>
            <a style={{ marginRight: 10 }}>删除</a>
          </Popconfirm>
          
          <Link to={"/admin/news/edit/"+obj.id}>编辑</Link>
        </span>
      ),
    }];

    let { data } = this.state;
    data.forEach(v => {
      v.key = v.id;
    })
    return (
      <AdminSider keys={'news_list'}>
        <Table columns={columns} dataSource={data} />
      </AdminSider>
    )
  }
}
export default NewsList