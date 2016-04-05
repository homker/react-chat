import React, {PropTypes} from 'react';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Avatar from 'material-ui/lib/avatar'



const Comment = React.createClass({

    PropTypes: {
        user: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    },


    render(){
        return (
            <Paper zDepth={2} className="comment">
                <Avatar>{this.props.user.slice(0,1).toLocaleUpperCase()}</Avatar>
                <span>{this.props.user}</span><br/>
                <TextField
                    ref="content"
                    multiLine={true}
                /><br/>
                <RaisedButton label="发送" onTouchTap={this._onTouchTap}/>
            </Paper>
        )
    },

    _onTouchTap(){
        let self = this;
        this.props.onSubmit(self.props.user, self.refs.content.getValue());
        this.refs.content.setValue('');
    }
});

export default Comment;