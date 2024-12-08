import React, { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './RegistrationFormWithRhfAndYap.module.scss'
import { IRegistrationFormProps } from '@models/IRegistrationFormProps'
import { IRegistrationData } from '@models/IRegistrationData'
import { ObjectSchema } from 'yup'
interface IFormInputs extends IRegistrationData {
	passwordRepeat: string
}

const fieldsSchema: ObjectSchema<IFormInputs> = yup.object({
	email: yup
		.string()
		.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Неверный email')
		.required('Email обязательное поле'),
	password: yup.string().min(8, 'Пароль должен быть не менее 8 символов').required('Пароль обязательное поле'),
	passwordRepeat: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароли не совпадают')
		.required('Повтор пароля обязательное поле'),
})

export const RegistrationFormWithRhfAndYap: React.FC<IRegistrationFormProps> = ({ sendData }) => {
	const regButtonRef = useRef<HTMLButtonElement>(null)
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<IFormInputs>({
		defaultValues: {
			email: '',
			password: '',
			passwordRepeat: '',
		},
		resolver: yupResolver(fieldsSchema),
	})

	const onSubmit: SubmitHandler<IFormInputs> = (data) => {
		sendData({ email: data.email, password: data.password })
	}

	useEffect(() => {
		if (isValid) {
			regButtonRef.current?.focus()
		}
	}, [isValid])
	return (
		<>
			<div>
				<h2>Регистрация нового пользователя</h2>
				<sup>(с React Hook Form и Yup)</sup>
			</div>

			<form className={styles.regForm} onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
				<input placeholder="Email" type="text" {...register('email')} />
				<input placeholder="Пароль" type="password" {...register('password')} />
				<input placeholder="Повтор пароля" type="password" {...register('passwordRepeat')} />
				<button ref={regButtonRef} className={styles.btn} type="submit" disabled={Object.keys(errors).length > 0}>
					Зарегистрироваться
				</button>
			</form>
			{Object.values(errors).map((error, index) => (
				<div key={index} className={styles.errorMessage}>
					{error.message}
				</div>
			))}
		</>
	)
}
