import React from 'react'
import { InformationLayout } from '@components/InformationLayout/InformationLayout'
import { IGameComponentProps } from '@models/IGameComponentProps'

export const Information: React.FC<Pick<IGameComponentProps, 'isDraw' | 'isGameEnded' | 'currentPlayer'>> = ({
	isDraw,
	isGameEnded,
	currentPlayer,
}) => {
	return <InformationLayout currentPlayer={currentPlayer} isGameEnded={isGameEnded} isDraw={isDraw} />
}
