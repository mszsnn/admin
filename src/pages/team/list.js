import React from "react"
import AdminSider from '../../components/sider.jsx';
import {Table, Icon, Divider,message} from 'antd';
class TeamList extends React.Component {
    constructor(){
        super();
        this.handleDelete=this.handleDelete.bind(this);
    }
    state={
        data: []
    };
    componentDidMount(){
        fetch('/api/team/show').then(r=>r.json()).then(d=>{
            this.setState({
                data:d
            })
        })
    }
    fetchData(){
        fetch('/api/team/show').then(r=>r.json()).then(d=>{
            this.setState({
                data:d
            })
        })
    }
    handleDelete(v){
        fetch('/api/team/del?id='+v.id).then(r=>r.text()).then(r=>{
            if(r==='ok'){
                message.success('删除成功',1);
                this.fetchData();
            }
        })
    }
    render() {
        let {data}=this.state;
        data=data.map((v)=>{
            v.key=v.id;
            return v;
        });
        const columns=[{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '英文名称',
            dataIndex: 'ename',
            key: 'ename',
        },{
            title: '图片',
            dataIndex: 'pic',
            key: 'pic',
        }, {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '介绍',
            dataIndex: 'introduce',
            key: 'introduce',
        },{
            title: '操作',
            key: 'action',
            render: (v) => (
                <span>
      <a  onClick={()=>{this.handleDelete(v)}}>删除</a><Divider type="vertical" />
                    <a href="#">修改</a>
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