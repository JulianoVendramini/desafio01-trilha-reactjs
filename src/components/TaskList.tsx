import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function randomNum(){
    const number = Math.floor(Math.random() * 100); //Getting a random rounded number between 0 and 100

    return number;
  }

  function handleCreateNewTask() { 
    
    if(!newTaskTitle) return; //Checking if the user typed a new title

    const randomId = randomNum(); //Getting an random ID

    const newTask:Task = { //Creating a new object
      id: randomId,
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(oldTasks => [...oldTasks, newTask]); //Adding the new task without change the old tasks's state
    setNewTaskTitle(''); //Setting the new task title to empty
  }

  function handleToggleTaskCompletion(id: number) {

    tasks.map((task) => { //Mapping the array
      (task.id == id ? (task.isComplete = !task.isComplete) : task) //Checking the ID and setting the isComplete's value to the opposite
    })

    setTasks([...tasks]) //Overwriting tasks array with the updated value of isComplete
  }

  function handleRemoveTask(id: number) {

    const filteredTasks = tasks.filter((task) => { return task.id != id }) //Get an array without the task selected
    setTasks(filteredTasks); //Setting the tasks array with the filtered array 
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}