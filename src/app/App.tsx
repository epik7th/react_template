import styles from './App.module.scss'
import * as React from 'react'
import { Todos } from '../pages'

export const App: React.FC = () => {
	return (
		<main className={styles.mainContainer}>
			<Todos />
		</main>
	)
}
