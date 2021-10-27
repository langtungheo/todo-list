import React from 'react'
import CreateNewTask from '../components/createTask/CreateNewTask'
import TodoListComponent from '../components/todoList/TodoListComponent'

export default function Homepage() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 p-3 justify-center items-center flex" >
                <CreateNewTask />
            </div>
            <div className="md:col-span-3  p-3 overflow-hidden max-h-screen">
                <TodoListComponent />
            </div>
            
        </div>
    )
}
