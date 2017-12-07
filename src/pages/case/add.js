/**
 * Created by ms on 2017/12/6.
 */
import React from "react"
import AdminSider from '../../components/sider.jsx';
import {Table} from 'antd';
class CaseAdd extends React.Component{
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
        fetch('/api/test').then(r=>r.json()).then(d=>this.setState({data:d}))
    }
}
export default CaseAdd;