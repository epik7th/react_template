import { useState } from 'react'
import styles from './App.module.scss'
import * as React from 'react'
import data from './data.json'
import { IDataType } from './IDataType.ts'

export const App: React.FC = () => {
	const [steps] = useState<IDataType[]>(data)
	const [activeIndex, setActiveIndex] = useState<number>(0)

	const nextStep = () => {
		setActiveIndex(activeIndex + 1)
	}
	const prevStep = () => {
		setActiveIndex(activeIndex - 1)
	}
	const resetStep = () => {
		setActiveIndex(0)
	}

	const isStartStep = activeIndex === 0
	const isEndStep = activeIndex === steps.length - 1

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>{steps[activeIndex].content}</div>
					<ul className={styles['steps-list']}>
						{steps.map((item, i) => (
							<li
								className={
									styles['steps-item'] +
									(activeIndex >= i ? ' ' + styles.done : '') +
									(activeIndex === i ? ' ' + styles.active : '')
								}
								key={item.id}
							>
								<button className={styles['steps-item-button']} onClick={() => setActiveIndex(i)}>
									{i + 1}
								</button>
								{item.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={prevStep} disabled={isStartStep}>
							Назад
						</button>
						<button className={styles.button} onClick={isEndStep ? resetStep : nextStep}>
							{isEndStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
