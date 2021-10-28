import React from 'react'
import CreateNewTask from '../components/createTask/CreateNewTask'
import TodoList from '../components/todoList/TodoList'

export default function Homepage() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
            <div className="hidden md:col-span-2 p-3 justify-center items-center md:flex" >
                <CreateNewTask />
            </div>
            <div className="md:col-span-3  p-3 overflow-hidden h-screen">
                <TodoList />
            </div>
            
        </div>
    )
}
