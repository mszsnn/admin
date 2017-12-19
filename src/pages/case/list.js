import React from "react"
import AdminSider from '../../components/sider.jsx';
import {Table, Icon, Divider, message,Popconfirm} from 'antd';
import {
    Link
} from 'react-router-dom';
class CaseList extends React.Component {
    constructor() {
        super();
        this.handleDelete=this.handleDelete.bind(this);
    }

    state={
        data: []
    };

    componentDidMount() {
        fetch('/api/case/show').then(r => r.json()).then(d => {
            this.setState({
                data: d
            })
        })
    }

    fetchData() {
        fetch('/api/case/show').then(r => r.json()).then(d => {
            this.setState({
                data: d
            })
        })
    }

    handleDelete(v) {
        fetch('/api/case/del?id=' + v.id).then(r => r.text()).then(r => {
            if (r === 'ok') {
                message.success('删除成功', 1);
                this.fetchData();
            }
        })
    }

    render() {
        let {data}=this.state;
        console.log(data);
        data.forEach(v=> {
            v.key=v.id;
        });
        const columns=[{
            title: '名称',
            dataIndex: 'titleCh',
            key: 'titleCH',
        }, {
            title: '英文标题',
            dataIndex: 'titleEn',
            key: 'titleEN',
        }, {
            title: '项目图片',
            dataIndex: 'img',
            key: 'img',
        }, {
            title: '时间',
            dataIndex: 'upDateTime',
            key: 'upDataTime',
        }, {
            title: '操作',
            key: 'action',
            render: (v) => (
                <span>
      <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => { this.handleDelete(v.id) }}>
            <a style={{ marginRight: 10 }}>删除</a>
          </Popconfirm>
                    <Divider type="vertical"/>
                    <Link to={"/admin/case/edit/"+v.id}>编辑</Link>
    </span>
            ),
        }];

        return (
            <AdminSider keys={'case_list'}>
                <Table columns={columns} dataSource={data}/>
            </AdminSider>
        )
    }
}
export default CaseList;