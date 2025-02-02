import React, { useEffect } from 'react'
import { ITodo } from '../model/ITodo'
import './Todo.scss'
import { useUpdateTodo } from '../api/TodoApi'
import { useNavigate } from 'react-router-dom'

export const Todo: React.FC<{ todo: ITodo; successUpdate: () => void }> = ({ todo, successUpdate }) => {
	const navigate = useNavigate()
	const { update, isSuccess: isSuccessUpdate, error: errorUpdate } = useUpdateTodo()
	const completeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		void update(todo.id, { completed: event.target.checked })
	}

	const goToTaskDetail = () => {
		void navigate(`/task/${todo.id}`)
	}
	useEffect(() => {
		if (isSuccessUpdate) {
			successUpdate()
		}
	}, [isSuccessUpdate, successUpdate])
	return (
		<div className={'todo'}>
			<input onChange={completeChangeHandler} type="checkbox" checked={todo.completed} />
			<div onClick={goToTaskDetail} className={'todo-title'}>
				<div className={'text'}>{todo.title}</div>
				{errorUpdate && <div className={'error'}>{errorUpdate}</div>}
			</div>
		</div>
	)
}
