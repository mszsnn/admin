import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Index from "./pages/login/index"
import Login from "./pages/login/login"
import Pass from "./pages/login/pass"
import NewsAdd from "./pages/news/add.js"
import NewsList from "./pages/news/list.js"
import NewsEdit from "./pages/news/edit.js"
import ServiceAdd from "./pages/service/add.js"
import ServiceList from "./pages/service/list.js"
import ServiceEdit from "./pages/service/edit.js"
import CaseAdd from "./pages/case/add.js"
import CaseList from "./pages/case/list.js"
import CaseEdit from "./pages/case/edit.js"
import TeamAdd from "./pages/team/add.js"
import TeamList from "./pages/team/list.js"
import TeamEdit from "./pages/team/edit.js"
class App extends Component {
    render() {
        return (
            <Router>
                <div className='app'>
                    <Route path="/admin/login/index" component={Index}/>
                    <Route path="/admin/login/login" component={Login}/>
                    <Route path="/admin/login/pass" component={Pass}/>
                    <Route path="/admin/news/add" component={NewsAdd}/>
                    <Route path="/admin/news/list" component={NewsList}/>
                    <Route path="/admin/news/edit/:id" component={NewsEdit}/>
                    <Route path="/admin/service/add" component={ServiceAdd}/>
                    <Route path="/admin/service/list" component={ServiceList}/>
                    <Route path="/admin/service/edit" component={ServiceEdit}/>
                    <Route path="/admin/case/add" component={CaseAdd}/>
                    <Route path="/admin/case/list" component={CaseList}/>
                    <Route path="/admin/case/edit" component={CaseEdit}/>
                    <Route path="/admin/team/add" component={TeamAdd}/>
                    <Route path="/admin/team/list" component={TeamList}/>
                    <Route path="/admin/team/edit" component={TeamEdit}/>
                </div>
            </Router>
        );
    }
}

export default App;
