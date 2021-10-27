import {combineReducers} from 'redux'
import modalReducers from './modalReducers';
import todoReducers from './todoReducers';

const rootReducers = combineReducers({
    todoList : todoReducers,
    modal : modalReducers,
    
})

export default rootReducers;