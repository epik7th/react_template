import React from 'react'
import { IGameComponentProps } from '@models/IGameComponentProps'

export const InformationLayout: React.FC<Pick<IGameComponentProps, 'isGameEnded' | 'isDraw' | 'currentPlayer'>> = ({
	isDraw,
	isGameEnded,
	currentPlayer,
}) => {
	return (
		<div>
			{isDraw && 'Ничья'}
			{!isDraw && isGameEnded && `Победа: ${currentPlayer}`}
			{!isDraw && !isGameEnded && `Ходит: ${currentPlayer}`}
		</div>
	)
}
