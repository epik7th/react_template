import { useState } from 'react'
import styles from './App.module.scss'
import * as React from 'react'

type Nums = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'
type Buttons = 'C' | '+' | '-' | '='

const NUMS: Nums[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const BUTTONS: Buttons[] = ['C', '+', '-', '=']

export const App: React.FC = () => {
	const [operand1, setOperand1] = useState<string>('')
	const [operand2, setOperand2] = useState<string>('')
	const [operator, setOperator] = useState<string>('')
	const [showResult, setShowResult] = useState<boolean>(false)
	const numHandler = (num: string) => {
		setShowResult(false)
		if (operator === '') {
			setOperand1(operand1 + num)
		} else {
			setOperand2(operand2 + num)
		}
	}
	const buttonHandler = (action: string) => {
		if (action === '+' || action === '-') {
			setOperator(action)
			setShowResult(false)
		} else if (action === 'C') {
			setShowResult(false)
			setOperator('')
			setOperand1('')
			setOperand2('')
		} else if (action === '=' && operand1 !== '' && operand2 !== '') {
			setShowResult(true)
			setOperand2('')
			setOperator('')
			if (operator === '+') {
				setOperand1(String(Number(operand1) + Number(operand2)))
			} else if (operator === '-') {
				setOperand1(String(Number(operand1) - Number(operand2)))
			}
		}
	}
	return (
		<div className={styles.calculator}>
			<div className={styles.display + ' ' + (showResult ? styles.showResult : '')}>
				{operand1 + operator + operand2}
			</div>
			<div className={styles.nums}>
				{NUMS.map((item) => (
					<button key={item} onClick={() => numHandler(item)} className={styles.button}>
						{item}
					</button>
				))}
			</div>
			<div className={styles.buttons}>
				{BUTTONS.map((item) => (
					<button key={item} onClick={() => buttonHandler(item)} className={styles.button}>
						{item}
					</button>
				))}
			</div>
		</div>
	)
}
