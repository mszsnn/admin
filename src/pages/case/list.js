/**
 * Created by ms on 2017/12/6.
 */
import React from "react"
import AdminSider from '../../components/sider.jsx';
import {Table} from 'antd';
class CaseList extends React.Component{
    state = {
        data:[]
    }
    render(){
        let columns = [
            {title:'xuhao',dataIndex:'id',key:'id'},
            {title:'name',dataIndex:'name',key:'name'},
            {title:'type',dataIndex:'type',key:'type'},
        ]
        return (
            <AdminSider keys={'team_add'}>
                <Table columns={columns} dataSource={this.state.data}/>
            </AdminSider>
        )
    }
    componentDidMount(){
        console.log(1);
        fetch('/api/news/show').then(r=>r.json()).then(d=>{
            console.log(d);
        })
    }
}
export default CaseList;