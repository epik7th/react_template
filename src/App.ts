import { createElement, useState, Fragment } from 'react'
import ReactLogo from './assets/react.svg?react'
import viteLogo from '/vite.svg'
import './App.scss'
import * as React from 'react'

const currentYear: number = new Date().getFullYear()

export const App: React.FC = () => {
	const [count, setCount] = useState(0)

	return createElement(
		Fragment,
		null,
		createElement(
			'div',
			null,
			createElement(
				'a',
				{ href: 'https://vite.dev', target: '_blank' },
				createElement('img', { src: viteLogo, className: 'logo', alt: 'Vite logo' }),
			),
			createElement(
				'a',
				{ href: 'https://react.dev', target: '_blank' },
				createElement(ReactLogo, { className: 'logo react' }),
			),
		),
		createElement('h1', null, 'Vite + React'),
		createElement(
			'div',
			{ className: 'card' },
			createElement('button', { onClick: () => setCount((count) => count + 1) }, `count is ${count}`),
			createElement('p', null, 'Edit ', createElement('code', null, 'src/App.ts'), ' and save to test HMR'),
		),
		createElement('p', { className: 'read-the-docs' }, 'Click on the Vite and React logos to learn more'),
		createElement('p', null, `Текущий год ${currentYear}`),
	)
}
