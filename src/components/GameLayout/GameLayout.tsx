import React from 'react'
import { Information } from '@components/Information/Information'
import { Field } from '@components/Field/Field'
import { IGameComponentProps } from '@models/IGameComponentProps'

export const GameLayout: React.FC<IGameComponentProps> = ({
	playerMove,
	field,
	isDraw,
	currentPlayer,
	isGameEnded,
}) => {
	return (
		<>
			<Information isDraw={isDraw} currentPlayer={currentPlayer} isGameEnded={isGameEnded} />
			<Field field={field} playerMove={playerMove} />
		</>
	)
}
