import styles from './App.module.scss'
import * as React from 'react'
import { IRegistrationData } from '@models/IRegistrationData'
import { RegistrationFormWithoutRhfAndYap } from '@components/registration-form-without-rhf-and-yap/RegistrationFormWithoutRhfAndYap'
import { RegistrationFormWithRhfAndYap } from '@components/registration-form-with-rhf-and-yap/RegistrationFormWithRhfAndYap'

const handlerRegistration = (data: IRegistrationData): void => {
	console.log(data)
}

export const App: React.FC = () => {
	return (
		<div className={styles.root}>
			<RegistrationFormWithoutRhfAndYap sendData={handlerRegistration} />
			<hr style={{ width: '100%' }} />
			<RegistrationFormWithRhfAndYap sendData={handlerRegistration} />
		</div>
	)
}
