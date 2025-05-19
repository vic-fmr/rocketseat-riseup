import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, undo, redo } from './redux/tasksSlice'
import type { RootState } from './redux/store'

import Task from './components/Task'
import styles from './App.module.css'
import './global.css'

import Logo from './assets/todo-logo.png'
import Clipboard from './assets/clipboard.png'
import { PlusCircle } from 'phosphor-react'

function App() {
  const [task, setTask] = useState<string>('')

  const tasks = useSelector((state: RootState) => state.tasks.present)
  const dispatch = useDispatch()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (task.trim() === '') return
    dispatch(addTask(task))
    setTask('')
  }

  // Ctrl+Z / Ctrl+Y
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        dispatch(undo())
      }
      if (e.ctrlKey && e.key === 'y') {
        dispatch(redo())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])

  return (
    <main>
      <header>
        <img src={Logo} alt="Logo" />
        
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Adicione uma nova tarefa'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type='submit'>Criar <PlusCircle size={16} /></button>
        </form>

        <div className={styles.undoRedoButtons}>
          <button type="button" onClick={() => dispatch(undo())}>↶ Desfazer</button>
          <button type="button" onClick={() => dispatch(redo())}>↷ Refazer</button>
        </div>

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
        {tasks.length === 0 ? (
          <div className={styles.noTaskContainer}>
            <img src={Clipboard} />
            <div>
              <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        ) : (
          [...tasks].reverse().map((task) =>
            <Task key={task.id} {...task} />
          )
        )}
      </article>
    </main>
  )
}

export default App
