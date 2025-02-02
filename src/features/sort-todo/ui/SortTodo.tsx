import React, { useState } from 'react'
import styles from './SortTodo.module.scss'

interface SortTodoProps {
	sortAction: (value: boolean) => void
}

export const SortTodo: React.FC<SortTodoProps> = ({ sortAction }) => {
	const [sort, setSort] = useState<boolean>(false)
	const sortHandler = () => {
		setSort((value) => !value)
		sortAction(!sort)
	}
	return (
		<>
			<button className={sort ? styles.active : ''} onClick={sortHandler}>
				A&darr;
			</button>
		</>
	)
}
