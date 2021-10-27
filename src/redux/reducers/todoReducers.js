import { DELETE_TASK, DELETE_TASKS_CHECK, GET_TASKS_RENDER, SET_NEW_TASK, UPDATE_TASK } from "../types/todiListType";

const todoList = {
    todoList : [],
    listTaskRender : []
}

const todoReducers = (state = todoList, action) => {
    switch (action.type) {

    case SET_NEW_TASK:
        state.todoList.push(action.task);
        state.listTaskRender = state.todoList
        return { ...state}
    case DELETE_TASK:
        state.todoList = state.todoList.filter(todo => todo.id !== action.id)
        state.listTaskRender = state.todoList
        return {...state}
    case DELETE_TASKS_CHECK :
        const {tasks} = action;
        for (const task of tasks) {
            state.todoList = state.todoList.filter(todo => todo.id !== task.id)
            state.listTaskRender = state.todoList
        }
        return { ...state}
    case GET_TASKS_RENDER:
        const {key} = action;
        if(!key){
            state.listTaskRender = state.todoList
        }
        else{
            state.listTaskRender = state.todoList.filter(task => task.taskName.includes(key))
        }
        return { ...state}
    case UPDATE_TASK:
        const index = state.todoList.findIndex(task => task.id === action.id);
        state.todoList[index] = {...state.todoList[index], ...action.task}
        state.listTaskRender = state.todoList;
        return { ...state}
    default:
        return state
    }
    
}

export default todoReducers;
