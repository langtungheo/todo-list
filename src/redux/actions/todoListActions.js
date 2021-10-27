import { DELETE_TASK, DELETE_TASKS_CHECK, GET_TASKS_RENDER, SET_NEW_TASK, UPDATE_TASK } from "../types/todiListType";

export const setNewTask = (task) => ({
    type : SET_NEW_TASK,
    task : task
})

export const getTasksRender = (key) => (
    {
        type : GET_TASKS_RENDER,
        key : key
    }
)

export const deleteTask = (id)=>({
    type : DELETE_TASK,
    id: id
})

export const deleteTasksCheck = (tasks) => ({
    type : DELETE_TASKS_CHECK,
    tasks : tasks
})

export const updateTask = (id, task)=> ({
    type : UPDATE_TASK,
    id : id,
    task : task
})