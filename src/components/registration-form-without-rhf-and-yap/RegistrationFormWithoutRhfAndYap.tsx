import React, { useRef, useState, useEffect } from 'react'
import styles from './RegistrationFormWithoutRhfAndYap.module.scss'
import { IRegistrationFormProps } from '@models/IRegistrationFormProps'
import { IRegistrationData } from '@models/IRegistrationData'

interface IFormInputs extends IRegistrationData {
	passwordRepeat: string
}
interface FormInputError {
	name: string
	message: string
}

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const validatePassword = (password: string) => password.length >= 8

export const RegistrationFormWithoutRhfAndYap: React.FC<IRegistrationFormProps> = ({ sendData }) => {
	const regButtonRef = useRef<HTMLButtonElement>(null)
	const [formData, setFormData] = useState<IFormInputs>({
		email: '',
		password: '',
		passwordRepeat: '',
	})
	const [errors, setErrors] = useState<FormInputError[]>([])

	const validateInput = (name: string, value: string): FormInputError | null => {
		if (name === 'email') {
			return !validateEmail(value) ? { name, message: 'Некорректный email' } : null
		}
		if (name === 'password') {
			return !validatePassword(value) ? { name, message: 'Пароль должен быть не менее 8 символов' } : null
		}
		if (name === 'passwordRepeat') {
			return formData.password !== value ? { name, message: 'Пароли не совпадают' } : null
		}
		return null
	}

	const validateForm = () => {
		const formErrors: FormInputError[] = []
		Object.entries(formData).forEach(([name, value]) => {
			const inputName = name as keyof IFormInputs
			const inputValue = value as string
			const error = validateInput(inputName, inputValue)
			if (error) formErrors.push(error)
		})
		setErrors(formErrors)
		return formErrors.length === 0
	}

	const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target
		setFormData((prev) => ({ ...prev, [name]: value }))
		const inputError = validateInput(name, value)
		setErrors((prevErrors) => {
			const newErrors = prevErrors.filter((error) => error.name !== name)
			if (inputError) {
				newErrors.push(inputError)
			}
			return newErrors
		})
	}

	useEffect(() => {
		if (errors.length === 0 && Object.values(formData).every((value) => value !== '')) {
			regButtonRef.current?.focus()
		}
	}, [errors, formData])

	const onSubmitForm = (event: React.FormEvent) => {
		event.preventDefault()
		if (validateForm()) {
			sendData({ email: formData.email, password: formData.password })
		}
	}

	return (
		<>
			<div>
				<h2>Регистрация нового пользователя</h2>
				<sup>(без React Hook Form и Yup)</sup>
			</div>

			<form className={styles.regForm} onSubmit={onSubmitForm}>
				<input name="email" placeholder="Email" type="email" onChange={onChange} value={formData.email} />
				<input name="password" placeholder="Пароль" type="password" onChange={onChange} value={formData.password} />
				<input
					name="passwordRepeat"
					placeholder="Повтор пароля"
					type="password"
					onChange={onChange}
					value={formData.passwordRepeat}
				/>
				<button
					ref={regButtonRef}
					className={styles.btn}
					type="submit"
					disabled={errors.length > 0 || Object.values(formData).some((value) => !value)}
				>
					Зарегистрироваться
				</button>
			</form>
			{errors.map((error, index) => (
				<div key={index} className={styles.errorMessage}>
					{error.message}
				</div>
			))}
		</>
	)
}
