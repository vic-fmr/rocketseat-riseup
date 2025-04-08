import { useState } from 'react'

import Task from './components/Task'

import styles from './App.module.css'
import './global.css'

import Logo from './assets/todo-logo.png'
import Clipboard from './assets/clipboard.png'
import { PlusCircle } from 'phosphor-react'

export interface ITask {
  id: number
  task: string
  done: boolean
}

function App() {

  const [tasks, setTasks] = useState<ITask[]>([])
  const [task, setTask] = useState<string>('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (task == '') return

    const newTask: ITask = {
      id: tasks.length + 1,
      task,
      done: false
    }

    setTasks([...tasks, newTask])
    setTask('')
  }

  return (
    <main>

      <header>
        <img src={Logo} alt="Logo" />
        <form className={styles.inputContainer} onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder='Adicione uma nova tarefa' value={task} onChange={(e) => setTask(e.target.value)} />
          <button type='submit' >Criar <PlusCircle size={16} /></button>
        </form>
      </header>

      <article className={styles.tasks}>
        <div className={styles.tasksHeader}>
          <span className={styles.tasksMadeTitle}>Tarefas criadas
            <span className={styles.tasksMade}>{tasks.length}</span>
          </span>
          <span className={styles.tasksDoneTitle}>Concluídas
            <span className={styles.tasksDone}>{tasks.filter((task) => task.done).length} de {tasks.length}</span>
          </span>
        </div>
        {tasks.length === 0
          ?
          <div className={styles.noTaskContainer}>
            <img src={Clipboard} />
            <div>
              <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
          :
          [...tasks].reverse().map((task, index) =>
            <Task
              key={index}
              task={task.task}
              done={task.done}
              id={task.id}
              setTasks={setTasks} />)}
      </article>

    </main>
  )
}

export default App
