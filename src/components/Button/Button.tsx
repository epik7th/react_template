import React from 'react'
import styles from './Button.module.scss'

export const Button: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => {
	return (
		<button onClick={onClick} className={styles.button}>
			{children}
		</button>
	)
}
