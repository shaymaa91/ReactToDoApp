import { useState, useRef, useEffect } from 'react';
import ToDoList from '../ToDoList/ToDoList';
import './App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap';
import uuidv4 from '../../../node_modules/uuid/dist/v4'


const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  //load storted todos just once on refresh the page
  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedToDos) setTodos(storedToDos);

  }, []);

  //each time the todos state has been changed then store the new change on the locale storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);



  //hande the add todo process use the useRef hook to reference to the input
  const handleAddToDo = (e) => {
    const name = todoNameRef.current.value;
    if (name === '') return

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }]
    });
    todoNameRef.current.value = null

  }

  //handle the checkbox toggle 
  const toggleToDos=(id)=>{
    const newToDos=[...todos];
    const targetedToDo = newToDos.find(todo=> todo.id===id);
    targetedToDo.completed = !targetedToDo.completed;
    setTodos(newToDos);
  }

  const handleClearTodos=()=>{
    let newToDos = [...todos];
    newToDos=newToDos.filter(todo=>!todo.completed);
    setTodos(newToDos);
  }
  return (
    <>

      <div className='row m-5'>
        <ToDoList todos={todos} toggleToDos={toggleToDos} />
        <div className='col-md-3'>
          <input ref={todoNameRef} type="text" className='form-control' id="" />
        </div>
        <div className='col-md-3'>
          <button onClick={handleAddToDo} className='btn btn-info mx-2'>Add</button>
          <button onClick={handleClearTodos} className='btn btn-info mx-2'>Remove </button>
        </div>

        <div>{todos.filter(todo=> !todo.completed).length} left ToDos</div>
      </div>


    </>

  );
}

export default App;
