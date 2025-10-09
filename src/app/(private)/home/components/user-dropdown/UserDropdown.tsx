'use client';

import React, { useEffect, useState } from 'react';

interface UserDropdownProps {
	onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onLogout }) => {
	// Pega avatar do localStorage ou usa um default
	const [avatarUrl, setAvatarUrl] = useState(
		localStorage.getItem('userAvatar') ||
			'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
	);

	// Atualiza avatar quando localStorage mudar (ex: ao trocar no perfil)
	useEffect(() => {
		const handleStorage = () => {
			const updatedAvatar = localStorage.getItem('userAvatar');
			if (updatedAvatar) setAvatarUrl(updatedAvatar);
		};

		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, []);

	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
				<div className="w-10 rounded-full">
					<img alt="User Avatar" src={avatarUrl} />
				</div>
			</div>
			<ul
				tabIndex={0}
				className="menu menu-sm dropdown-content bg-base-100/85 rounded-box z-1 mt-2 w-52 p-2 shadow"
			>
				<li>
					<a href="/profile" className="justify-between">
						Meu perfil
					</a>
				</li>
				{/* <li>
					<a>
						Configuração <span className="badge text-sm">Em breve</span>
					</a>
				</li> */}
				<li>
					<button onClick={onLogout} className="w-full text-left font-semibold">
						Sair
					</button>
				</li>
			</ul>
		</div>
	);
};

export default UserDropdown;
