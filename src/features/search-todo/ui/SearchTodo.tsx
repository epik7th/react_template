import * as React from 'react'
import { useRef, useState } from 'react'
import styles from './SearchTodo.module.scss'

const debounce = (func: (text: string) => void, delay: number) => {
	let timerId: NodeJS.Timeout

	return (text: string) => {
		clearTimeout(timerId)
		timerId = setTimeout(() => func(text), delay)
	}
}

export const SearchTodo: React.FC<{ searchAction: (text: string) => void }> = ({ searchAction }) => {
	const [search, setSearch] = useState<string>('')

	const debouncedSearch = useRef(debounce(searchAction, 1000)).current

	const searchHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(value)
		debouncedSearch(value)
	}

	return (
		<input className={styles.searchInput} type="search" placeholder="поиск" value={search} onChange={searchHandler} />
	)
}
