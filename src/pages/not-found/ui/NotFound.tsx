import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound: React.FC = () => {
	return (
		<div>
			<p>Страница не найдена</p>
			<Link to="/">Перейти на главную</Link>
		</div>
	)
}
