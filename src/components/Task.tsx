import { useState } from 'react'
import styles from './Task.module.css'
import { Trash } from 'phosphor-react'
import { ITask } from '../App'

export default function Task({
    done,
    task,
    id,
    setTasks
}: {
    done: boolean,
    task: string,
    id: number,
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}) {

    const handleCheckboxChange = () => {
        const newDoneState = !done;

        setTasks((prevTasks: ITask[]) =>
            prevTasks.map(t =>
                t.id === id ? { ...t, done: newDoneState } : t
            )
        );
    }

    const handleDelete = () => {
        setTasks((prevTasks: ITask[]) => prevTasks.filter(t => t.id !== id));
    }

    return (
        <div className={styles.task}>
            <div>
                <input
                    type="checkbox"
                    checked={done}
                    onChange={handleCheckboxChange}
                /><p>{task}</p>
            </div>
            <Trash
                className={styles.trashIcon}
                onClick={handleDelete}
            />
        </div>
    )
}