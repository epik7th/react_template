import { IRegistrationData } from '@models/IRegistrationData'

export interface IRegistrationFormProps {
	sendData: (data: IRegistrationData) => void
}
