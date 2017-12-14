import React from 'react';
import AdminSider from '../../components/sider.jsx';

class ServiceEdit extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <AdminSider keys={'service_edit'}>
                这是服务编辑页面
            </AdminSider>
        )
    }
}
export default ServiceEdit;