import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Login from "./pages/login/index.js"
import TeamAdd from "./pages/team/add.js"
import TeamList from "./pages/team/list.js"
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/admin/login" component={Login}/>
                    <Route path="/admin/team/add" component={TeamAdd}/>
                    <Route path="/admin/team/list" component={TeamList}/>
                </div>
            </Router>
        );
    }
}

export default App;
