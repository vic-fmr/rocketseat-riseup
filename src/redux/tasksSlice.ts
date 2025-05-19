import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITask {
  id: number
  task: string
  done: boolean
}

interface TasksState {
  past: ITask[][]
  present: ITask[]
  future: ITask[][]
}

const initialState: TasksState = {
  past: [],
  present: [],
  future: []
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: ITask = {
        id: state.present.length + 1,
        task: action.payload,
        done: false
      }

      state.past.push(state.present)
      state.present = [...state.present, newTask]
      state.future = []
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      state.past.push(state.present)
      state.present = state.present.map(task =>
        task.id === action.payload ? { ...task, done: !task.done } : task
      )
      state.future = []
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.past.push(state.present)
      state.present = state.present.filter(task => task.id !== action.payload)
      state.future = []
    },
    undo: (state) => {
      if (state.past.length === 0) return
      const previous = state.past.pop()!
      state.future.unshift(state.present)
      state.present = previous
    },
    redo: (state) => {
      if (state.future.length === 0) return
      const next = state.future.shift()!
      state.past.push(state.present)
      state.present = next
    }
  }
})

export const { addTask, toggleTask, deleteTask, undo, redo } = tasksSlice.actions
export default tasksSlice.reducer
