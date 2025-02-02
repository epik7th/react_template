import React, { useEffect, useRef, useState } from 'react'
import { useGetTodo, useRemoveTodo, useUpdateTodo } from '../../../entities/todo/api/TodoApi'
import styles from './TodoDetail.module.scss'
import { useNavigate, useParams } from 'react-router-dom'

export const TodoDetail: React.FC = () => {
	const { get, loading, error, data } = useGetTodo()
	const { id } = useParams()
	const navigate = useNavigate()
	const { remove, isSuccess: isSuccessRemove, error: errorRemove } = useRemoveTodo()
	const { update, isSuccess: isSuccessUpdate, error: errorUpdate } = useUpdateTodo()
	const [isEdit, setIsEdit] = useState(false)
	const titleInputRef = useRef<HTMLTextAreaElement>(null)
	const editToggle = () => {
		setIsEdit((value) => !value)
	}
	useEffect(() => {
		if (id) {
			void get(id)
		}
	}, [get, id])
	useEffect(() => {
		if (isSuccessRemove) {
			void navigate(`/`)
		}
	}, [isSuccessRemove, navigate])
	useEffect(() => {
		if (isSuccessUpdate) {
			void get(id!)
			editToggle()
		}
	}, [get, id, isSuccessUpdate])

	if (!id) {
		void navigate('/')
		return
	}

	const goBack = () => {
		void navigate(-1)
	}
	const removeHandler = () => {
		void remove(id)
	}

	const saveTask = () => {
		if (titleInputRef.current) {
			void update(id, { title: titleInputRef.current.value })
		}
	}

	return (
		<>
			<h1 className={styles.header} onClick={goBack}>
				&larr; Задачи
			</h1>
			<div className={styles.taskDetail}>
				{loading && !data && 'Загрузка...'}
				{error && <div className={styles.error}>{error}</div>}
				{errorRemove && <div className={styles.error}>{errorRemove}</div>}
				{errorUpdate && <div className={styles.error}>{errorUpdate}</div>}
				<div className={styles.btnRow}>
					{isEdit ? (
						<>
							<button onClick={saveTask}>Сохранить</button>
							<button onClick={editToggle}>Отмена</button>
						</>
					) : (
						<>
							<button onClick={editToggle}>Редактировать</button>
							<button onClick={removeHandler}>Удалить</button>
						</>
					)}
				</div>
				{data && !isEdit && <p>{data.title}</p>}
				{data && isEdit && <textarea ref={titleInputRef} rows={5} defaultValue={data.title}></textarea>}
			</div>
		</>
	)
}
