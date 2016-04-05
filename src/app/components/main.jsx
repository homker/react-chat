import React from 'react';
import Paper from 'material-ui/lib/paper';
import Avatar from 'material-ui/lib/avatar';
import {Link} from 'react-router';
import auth from './auth'
import Main from './container.jsx'
import Login from './login.jsx'

const App = React.createClass({

    getInitialState(){
        return {
            isLogin: auth.isLogin()
        }
    },

    updateAuth(isLogin){
        this.setState({
            isLogin: isLogin
        });
    },

    componentWillMount(){
        auth.onChange = this.updateAuth;
        auth.login();
    },

    render(){
        return (
            <Paper className="container">
                <h1 className="logo">
                    <Avatar>D</Avatar>a react demo
                    <small>{this.state.isLogin ?
                    <Link to="/logout">Log out</Link> :
                    <Link to="/login">sign in</Link>}
                    </small>
                </h1>

                {this.props.children||(this.state.isLogin?<Main/>:<Login/>)}
            </Paper>
        )
    }
});

export default App;