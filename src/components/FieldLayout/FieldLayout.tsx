import React from 'react'
import styles from './FieldLayout.module.scss'
import { IGameComponentProps } from '@models/IGameComponentProps'

export const FieldLayout: React.FC<Pick<IGameComponentProps, 'field' | 'playerMove'>> = ({ field, playerMove }) => {
	return (
		<div className={styles.grid}>
			{field.map((item, index) => (
				<div onClick={() => playerMove(index)} key={index}>
					{item}
				</div>
			))}
		</div>
	)
}
