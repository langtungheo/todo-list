import {combineReducers} from 'redux'
import todoReducers from './todoReducers';

const rootReducers = combineReducers({
    todoList : todoReducers
})

export default rootReducers;