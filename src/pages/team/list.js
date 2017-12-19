import React from "react"
import AdminSider from '../../components/sider.jsx';
import {Table, Icon, Divider, message,Popconfirm} from 'antd';
import {
    Link
} from 'react-router-dom'
class TeamList extends React.Component {
    constructor() {
        super();
        this.handleDelete=this.handleDelete.bind(this);
    }

    state={
        data: []
    };

    componentDidMount() {
        fetch('/api/team/show').then(r => r.json()).then(d => {
            this.setState({
                data: d
            })
        })
    }

    fetchData() {
        fetch('/api/team/show').then(r => r.json()).then(d => {
            this.setState({
                data: d
            })
        })
    }

    handleDelete(v) {
        fetch('/api/team/del?id=' + v.id).then(r => r.text()).then(r => {
            if (r === 'ok') {
                message.success('删除成功', 1);
                this.fetchData();
            }
        })
    }

    render() {
        let {data}=this.state;
        data.forEach((v) => {
            v.key=v.id;
        });
        const columns=[{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '英文名称',
            dataIndex: 'ename',
            key: 'ename',
        }, {
            title: '图片',
            dataIndex: 'pic',
            key: 'pic',
        }, {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '操作',
            key: 'action',
            render: (v) => (
                <span>
     <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => { this.handleDelete(v.id)}}>
            <a style={{ marginRight: 10 }}>删除</a>
          </Popconfirm><Divider type="vertical"/>
                    <Link to={"/admin/team/edit/"+v.id}>编辑</Link>
    </span>
            ),
        }];

        return (
            <AdminSider keys={'team_list'}>
                <Table columns={columns} dataSource={data}/>
            </AdminSider>
        )
    }
}
export default TeamList;