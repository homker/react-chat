export const SHOW_ALL = 'SHOW_ALL';
export const COMMIT_COMMENTS = 'COMMIT_COMMENTS';
export const RECIVE_MESSAGE = 'RECIVE_MESSAGE';
const Socket = require('socket.io-client')('http://127.0.0.1:6001');


export function fetchAllMessage() {
    return dispatch=> {
        return dispatch(getAllMessage());
    }
}

export function commmitComments(user, message) {
    return dispatch => {
        post2ServerWith(user, message, function (item, state) {
            return dispatch(commentState(item, state))
        })
    }
}

function commentState(item, state) {
    return {
        type: COMMIT_COMMENTS,
        state: state.state,
        item: item
    }
}

function reciveMessage(item) {
    return {
        type: RECIVE_MESSAGE,
        item
    }
}

function post2ServerWith(user, message, callback) {
    let item = {
        user: user,
        msgFrom: 'self',
        content: message,
        date:Date.now()
    };
    Socket.emit('chat Message', item);
    callback && callback(item, {
        state: 200
    })
}

function showAll(messages) {
    return {
        type: SHOW_ALL,
        messages
    }
}


function getAllMessage() {
    return dispatch => {
        getMessage(function (items) {
            return dispatch(showAll(items));
        })
    }
}

export function onReciveMessage() {
    return dispatch=> {
        Socket.on('chat Message', function (msg) {
            return dispatch(reciveMessage(msg))
        })
    }
}

function getMessage(callback) {
    callback && callback([{
        user: 'homker',
        msgFrom: 'self',
        content: 'the first message',
        date:Date.now()
    },
        {
            user: 'user',
            msgFrom: 'other',
            content: 'the seconed message',
            date: Date.now()
        }]);
}
