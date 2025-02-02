import * as React from 'react'
import styles from './AddTodo.module.scss'
import { useAddTodo } from '../../../entities'
import { useEffect, useState } from 'react'

export const AddTodo: React.FC<{ successAdd: () => void }> = ({ successAdd }) => {
	const { add, error, isSuccess, loading } = useAddTodo()
	const [newTask, setNewTask] = useState<string>('')
	const addTodoHandler = (event: React.FormEvent) => {
		event.preventDefault()
		void add({ completed: false, title: newTask })
	}
	useEffect(() => {
		if (isSuccess) {
			successAdd()
			setNewTask('')
		}
	}, [isSuccess, successAdd])
	return (
		<>
			{error && <div className={styles.error}>{error}</div>}
			<form className={styles.addTodo} onSubmit={addTodoHandler}>
				<input type="text" placeholder="новая задача" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
				<button disabled={loading || newTask.length < 3} type="submit">
					Добавить
				</button>
			</form>
		</>
	)
}
