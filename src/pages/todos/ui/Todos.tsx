import React, { useCallback, useEffect, useState } from 'react'
import styles from './Todos.module.scss'
import { AddTodo, SearchTodo, SortTodo } from '../../../features'
import { Todo, useGetTodos } from '../../../entities'

export const Todos: React.FC = () => {
	const [searchText, setSearchText] = useState<string>('')
	const [sort, setSort] = useState<boolean>(false)
	const { get, data, loading, error } = useGetTodos()

	const getTodos = useCallback(() => {
		void get(searchText, sort)
	}, [get, searchText, sort])

	useEffect(() => {
		getTodos()
	}, [getTodos])
	return (
		<>
			<h1>Задачи</h1>
			<div className={styles.list}>
				{loading && !data && 'Загрузка...'}
				{error && <div className={styles.error}>{error}</div>}
				<AddTodo successAdd={getTodos} />
				<div className={styles.filterRow}>
					<SearchTodo searchAction={setSearchText} />
					<SortTodo sortAction={setSort} />
				</div>
				{data?.map((item) => <Todo successUpdate={getTodos} todo={item} key={item.id} />)}
				{data?.length === 0 && 'Нет задач'}
			</div>
		</>
	)
}
