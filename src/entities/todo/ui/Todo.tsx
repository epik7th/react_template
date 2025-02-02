import React, { useEffect } from 'react'
import { ITodo } from '../model/ITodo'
import './Todo.scss'
import { useRemoveTodo, useUpdateTodo } from '../api/TodoApi'

export const Todo: React.FC<{ todo: ITodo; successUpdate: () => void }> = ({ todo, successUpdate }) => {
	const { update, isSuccess: isSuccessUpdate, error: errorUpdate } = useUpdateTodo()
	const { remove, isSuccess: isSuccessRemove, error: errorRemove } = useRemoveTodo()
	const completeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		void update(todo.id, { completed: event.target.checked })
	}
	const removeHandler = () => {
		void remove(todo.id)
	}
	useEffect(() => {
		if (isSuccessUpdate || isSuccessRemove) {
			successUpdate()
		}
	}, [isSuccessUpdate, isSuccessRemove])
	return (
		<div className={'todo'}>
			<input onChange={completeChangeHandler} type="checkbox" checked={todo.completed} />
			<div className={'todo-title'}>
				<div className={'text'}>{todo.title}</div>
				{errorUpdate && <div className={'error'}>{errorUpdate}</div>}
				{errorRemove && <div className={'error'}>{errorRemove}</div>}
			</div>
			<button className="todo-remove" onClick={removeHandler}>
				удалить
			</button>
		</div>
	)
}
