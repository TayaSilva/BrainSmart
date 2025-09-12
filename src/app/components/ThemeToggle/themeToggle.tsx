'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'synthwave'>('light');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	const handleToggle = () => {
		setTheme(theme === 'light' ? 'synthwave' : 'light');
	};

	return (
		<label className="swap swap-rotate cursor-pointer">
			{/* O checked é controlado pelo estado */}
			<input
				type="checkbox"
				onChange={handleToggle}
				checked={theme === 'synthwave'}
			/>

			{/* Ícone do modo claro */}
			<svg
				className="swap-off h-10 w-10 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path d="M5.64,17l-.71.71..." />
			</svg>

			{/* Ícone do modo escuro */}
			<svg
				className="swap-on h-10 w-10 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path d="M21.64,13a1,1,0,0,0-1.05-..." />
			</svg>
		</label>
	);
}
