import React,{PropTypes} from 'react';
import Paper from 'material-ui/lib/paper';
import auth from './auth';


const Logout = React.createClass({
    getInitialState(){
        let user = auth.getUserName();
        auth.logout();
        return {
            user: user
        };
    },


    render(){
        return (
            <Paper className="login-box">
                <h1>Good bye!<small>{this.state.user}</small></h1>
            </Paper>
        );
    }
});

export default Logout;