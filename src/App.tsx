import styles from './App.module.scss'
import * as React from 'react'
import { useState } from 'react'

interface ListItem {
	id: number
	value: string
	createdAt: Date
}

export const App: React.FC = () => {
	const [value, setValue] = useState<string>('')
	const [list, setList] = useState<ListItem[]>([])
	const [error, setError] = useState<string>('')
	const [isValueValid, setIsValueValid] = useState<boolean>(false)

	const addValueToList = (value: string) => {
		setList((updatedList) => [...updatedList, { id: Date.now(), value, createdAt: new Date() }])
	}

	const onInputButtonClick = () => {
		const promptValue: string | null = prompt('Введите значение')
		if (promptValue && promptValue.trim().length >= 3) {
			setValue(promptValue)
			setError('')
			setIsValueValid(true)
		} else {
			setError('Введенное значение должно содержать минимум 3 символа')
			setIsValueValid(false)
		}
	}
	const onAddButtonClick = () => {
		if (isValueValid) {
			setValue('')
			setError('')
			setIsValueValid(false)
			addValueToList(value)
		}
	}
	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: "<output className={styles.currentValue}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button className={styles.button} onClick={onAddButtonClick} disabled={!isValueValid}>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{list.length === 0 && <p className={styles.noMarginText}>Нет добавленных элементов</p>}
				{list.length > 0 && (
					<ul className={styles.list}>
						{list.map((item) => (
							<li key={item.id} className={styles.listItem}>
								{item.value} - {item.createdAt.toLocaleDateString()} {item.createdAt.toLocaleTimeString()}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}
