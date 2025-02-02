import styles from './App.module.scss'
import * as React from 'react'
import { NotFound, TodoDetail, Todos } from '../pages'
import { Navigate, Route, Routes } from 'react-router-dom'

export const App: React.FC = () => {
	return (
		<main className={styles.mainContainer}>
			<Routes>
				<Route path="/" element={<Todos />} />
				<Route path="/task/:id" element={<TodoDetail />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</main>
	)
}
