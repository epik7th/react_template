import styles from './Game.module.scss'
import { GameLayout } from '@components/GameLayout/GameLayout'
import React, { useState } from 'react'
import { TypePlayer } from '@models/TypePlayer'
import { TypeField } from '@models/TypeField'
import { Button } from '@components/Button/Button'

const WIN_PATTERNS: number[][] = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

export const Game: React.FC = () => {
	const [currentPlayer, setCurrentPlayer] = useState<TypePlayer>('X')
	const [isGameEnded, setIsGameEnded] = useState<boolean>(false)
	const [isDraw, setIsDraw] = useState<boolean>(false)
	const [field, setField] = useState<TypeField[]>(['', '', '', '', '', '', '', '', ''])
	const playerMove = (indexOfCell: number): void => {
		if (isDraw || isGameEnded || field[indexOfCell] !== '') {
			return
		}
		const newField = [...field]
		newField[indexOfCell] = currentPlayer
		setField(newField)
		if (!newField.some((e) => e === '')) {
			setIsDraw(true)
		}
		if (WIN_PATTERNS.some((set) => set.every((i) => newField[i] === 'X') || set.every((i) => newField[i] === '0'))) {
			setIsGameEnded(true)
		} else {
			setCurrentPlayer(currentPlayer === 'X' ? '0' : 'X')
		}
	}
	const resetGame = (): void => {
		setIsGameEnded(false)
		setField(['', '', '', '', '', '', '', '', ''])
		setIsDraw(false)
		setCurrentPlayer('X')
	}
	return (
		<div className={styles.root}>
			<GameLayout
				playerMove={playerMove}
				currentPlayer={currentPlayer}
				isGameEnded={isGameEnded}
				isDraw={isDraw}
				field={field}
			/>
			<Button onClick={resetGame}>Начать заново</Button>
		</div>
	)
}
