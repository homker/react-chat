import { combineReducers } from 'redux';
import { SHOW_ALL,COMMIT_COMMENTS,RECIVE_MESSAGE } from '../actions/actions.js';

function user(state, action) {
    return 'homker';
}

function Messages(state = {}, action) {
    console.log('state',state);
    switch (action.type) {
        case SHOW_ALL:
            return Object.assign({},state,{
                messages:action.messages
            });
        case COMMIT_COMMENTS:
        case RECIVE_MESSAGE:
            return Object.assign({},state,{
                messages:[...state.messages||[],action.item]
            });
        default:
            return state;
    }
}

function getAllMessage(state = {}, action) {
    switch (action.type) {
        case SHOW_ALL:
            return Object.assign({},Messages(state,action),{
                //TODO 添加新状态
            });
        default:
            return state;
    }
}


function commitMessage(state= {}, action) {
    switch (action.type) {
        case COMMIT_COMMENTS:
            return Object.assign({}, Messages(state,action), {
                item: action.item
            });
        default:
            return state;
    }
}

function reciveMessage(state = {}, action) {
    switch (action.type) {
        case RECIVE_MESSAGE:
            return Object.assign({}, Messages(state,action), {
                item: action.item
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user,
    getAllMessage,
    commitMessage,
    reciveMessage
});

export default  rootReducer;