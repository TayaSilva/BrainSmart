'use client';

import { useState } from 'react';
import UserDropdown from '@/app/(private)/home/components/user-dropdown/UserDropdown';
import ThemeToggle from '../theme-toggle/themeToggle';
import Link from 'next/link';

export default function Navbar() {
	const [loggedIn, setLoggedIn] = useState(true); // true = usuário logado
	const [nickname, setNickname] = useState('JhonVi');

	const handleLogout = () => {
		setLoggedIn(false);
		setNickname('');
	};

	return (
		<nav className="navbar bg-base-100/60 shadow-md px-6 py-6 flex justify-between items-center backdrop-blur border-b border-base-300">
			{/* 🌓 Toggle de tema - canto esquerdo */}
			<div>
				<ThemeToggle />
			</div>

			{/* 😎 Saudação + dropdown - canto direito */}
			<div className="flex items-center gap-4">
				{loggedIn ? (
					<>
						<span className="text-sm sm:text-base">
							Seja bem-vindo(a), <strong>{nickname}</strong>
						</span>
						<UserDropdown onLogout={handleLogout} />
					</>
				) : (
					<span className="text-sm sm:text-base">
						Faça login{' '}
						<Link href="/login" className="font-semibold text-primary">
							aqui
						</Link>
					</span>
				)}
			</div>
		</nav>
	);
}
