'use client';

import { useState } from 'react';
import UserDropdown from '@/app/(private)/home/components/user-dropdown/UserDropdown';
import ThemeToggle from '../theme-toggle/themeToggle';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
	const [loggedIn, setLoggedIn] = useState(true);
	const [nickname, setNickname] = useState('JhonVi');
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem('userToken');
		localStorage.removeItem('userAvatar');
		localStorage.removeItem('userName');

		// Redireciona pro login
		router.push('/login');
	};
	return (
		<nav className="navbar bg-base-100/60 shadow-md px-6 py-6 flex justify-between items-center backdrop-blur border-b border-base-300">
			<div>
				<ThemeToggle />
			</div>

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
