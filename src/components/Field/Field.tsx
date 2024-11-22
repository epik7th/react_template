import { FieldLayout } from '@components/FieldLayout/FieldLayout'
import React from 'react'
import { IGameComponentProps } from '@models/IGameComponentProps'

export const Field: React.FC<Pick<IGameComponentProps, 'field' | 'playerMove'>> = ({ field, playerMove }) => {
	return <FieldLayout field={field} playerMove={playerMove} />
}
