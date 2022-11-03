import React from 'react'
import ToDo from '../../components/ToDo/ToDo';

export default function ToDoList({ todos,toggleToDos }) {

    return (
        <>
            <div>
                {todos.map(todo => { return <ToDo key={todo.id} todo={todo} toggleToDos={toggleToDos} /> })}
            </div>
        </>

    )
}
