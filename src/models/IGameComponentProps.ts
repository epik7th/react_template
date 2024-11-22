import { TypeField } from '@models/TypeField'
import { TypePlayer } from '@models/TypePlayer'

export interface IGameComponentProps {
	field: TypeField[]
	currentPlayer: TypePlayer
	isGameEnded: boolean
	isDraw: boolean
	playerMove: (indexOfCell: number) => void
}
