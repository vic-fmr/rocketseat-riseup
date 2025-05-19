import styles from './Task.module.css'
import { Trash } from 'phosphor-react'
import { useDispatch } from 'react-redux'
import { toggleTask, deleteTask } from '../redux/tasksSlice'

interface TaskProps {
  id: number
  task: string
  done: boolean
}

export default function Task({ id, task, done }: TaskProps) {
  const dispatch = useDispatch()

  const handleCheckboxChange = () => {
    dispatch(toggleTask(id))
  }

  const handleDelete = () => {
    dispatch(deleteTask(id))
  }

  return (
    <div className={styles.task}>
      <div>
        <input
          type="checkbox"
          checked={done}
          onChange={handleCheckboxChange}
        />
        <p className={done ? styles.done : ''}>{task}</p>
      </div>
      <Trash
        className={styles.trashIcon}
        onClick={handleDelete}
      />
    </div>
  )
}
