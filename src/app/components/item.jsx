import React, {PropTypes} from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Colors from 'material-ui/lib/styles/colors';


const ChatListItem = React.createClass({
    PropTypes: {
        userName: PropTypes.string.isRequired,
        feedback: PropTypes.string,
        msgFrom: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    },
    render(){
        return (
            this.props.msgFrom !== 'self' ?
                <ListItem
                    leftAvatar={this.props.avatar}
                    primaryText={this.props.userName}
                    secondaryText={
      <p>
        {this.props.date?
            <span style={{color: Colors.darkBlack}}>{(new Date(this.props.date)).toDateString()}</span>
            :null}<br/>
        {this.props.content}
      </p>
    }
                    secondaryTextLines={2}/> :
                <ListItem
                    rightAvatar={this.props.avatar}
                    primaryText={this.props.userName}
                    secondaryText={
      <p>
        {this.props.date?
        <span style={{color: Colors.darkBlack}}>{(new Date(this.props.date)).toDateString()}</span>
        :null}<br/>
        {this.props.content}
      </p>
    }
                    secondaryTextLines={2}/>
        )
    }
});


export default ChatListItem;