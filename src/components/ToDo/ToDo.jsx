import React from 'react'

export default function ToDo({todo,toggleToDos}) {
   const handleToggleToDos=()=>{
    toggleToDos(todo.id)
   }
  return (
    <div>
        <label>
            <input onChange={handleToggleToDos}  type="checkbox" checked={todo.completed}/>
            {todo.name}
        </label>

    </div>
  )
}
