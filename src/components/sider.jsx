import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {Link} from 'react-router-dom';
const { SubMenu } = Menu;

const { Content, Sider } = Layout;
class AdminSider extends React.Component {
    render() {
        return (
            <Layout style={{height:'100%'}}>
                <Layout style={{height:'100%'}}>
                    <Sider width={200} style={{ background: '#fff'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[this.props.keys]}
                            defaultOpenKeys={['sub1','sub2','sub3',"sub4","sub5"]}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="lock" />密码管理</span>}>
                                <Menu.Item key="login_pass"><Link to="/admin/login/pass">修改密码</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="user" />团队管理</span>}>
                                <Menu.Item key="team_add"><Link to="/admin/team/add">新增成员</Link></Menu.Item>
                                <Menu.Item key="team_list"><Link to="/admin/team/list">管理成员</Link></Menu.Item>     
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="layout" />新闻管理</span>}>
                                <Menu.Item key="news_add"><Link to="/admin/news/add">新增新闻</Link></Menu.Item>
                                <Menu.Item key="news_list"><Link to="/admin/news/list">管理新闻</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="database" />服务项目</span>}>
                                <Menu.Item key="service_add"><Link to="/admin/service/add">新增服务</Link></Menu.Item>
                                <Menu.Item key="service_list"><Link to="/admin/service/list">管理服务</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" title={<span><Icon type="switcher" />案例管理</span>}>
                                <Menu.Item key="service_add"><Link to="/admin/case/add">新增案例</Link></Menu.Item>
                                <Menu.Item key="service_list"><Link to="/admin/case/list">管理案例</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default AdminSider