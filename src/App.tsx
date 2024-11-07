import { useState } from 'react'
import ReactLogo from './assets/react.svg?react'
import viteLogo from '/vite.svg'
import styles from './App.module.scss'
import * as React from 'react'

export const App: React.FC = () => {
	const [count, setCount] = useState(0)

	return (
		<div className={styles.root}>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className={styles.logo} alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<ReactLogo className={`${styles.logo} ${styles.react}`} />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className={styles.card}>
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className={styles.readTheDocs}>Click on the Vite and React logos to learn more</p>
		</div>
	)
}
