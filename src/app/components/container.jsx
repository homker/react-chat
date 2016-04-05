import React,{PropTypes} from 'react';
import Colors from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list';
import Avatar from 'material-ui/lib/avatar';
import ChatListItem from './item.jsx'
import Comment from './comment.jsx'


import {  fetchAllMessage,commmitComments, onReciveMessage } from  '../actions/actions'
import { connect } from 'react-redux';
//const Socket = require('socket.io-client')('http://127.0.0.1:6000');


//<ListDivider inset={true}/>


const Main = React.createClass({

    PropTypes: {
        selectedUser: PropTypes.string.isRequired,
        messages: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        data: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    },

    getInitialState(){
        this.props.dispatch(fetchAllMessage());
        return this.props;
    },


    componentWillReceiveProps(nextProps){
        console.log('receiver props');
    },

    _onSubmit(user, message){
        this.props.dispatch(commmitComments(user, message));
    },


    componentDidMount(){
      this.props.dispatch(onReciveMessage());
    },

    render() {
        return (
            <div>
                <List subheader="Today">
                    {this.props.items.map(function(item){
                        return <ChatListItem
                            msgFrom={item.msgFrom}
                            userName={item.user}
                            key={item.date+(Math.random()*100).toFixed(0)}
                            avatar={<Avatar>{item.user.slice(0,1).toLocaleUpperCase()}</Avatar>}
                            date={item.date?item.date:null}
                            content={item.content}
                        />
                        })}
                </List>
                <Comment
                    onSubmit={this._onSubmit}
                    user={this.props.user}
                />
            </div>
        )
    }
});


function mapState2Props(_state) {

    const {user,commitMessage,getAllMessage,reciveMessage} = _state;
    let _items = getAllMessage.messages ? [...getAllMessage.messages] : [];
    _items = _items.concat(commitMessage.messages||[]).concat(reciveMessage.messages||[]).sort(function(pre,nex){
        return (pre.date - nex.date)||-1 ;
    });
    console.log('items',_items);
    return {
        user,
        items:[..._items]
    }

}

export default connect(mapState2Props)(Main);