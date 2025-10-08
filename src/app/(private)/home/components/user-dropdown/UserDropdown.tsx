// src/components/UserDropdown.tsx
'use client';

import React from 'react';

interface UserDropdownProps {
	avatarUrl?: string;
	onLogout: () => void; // callback que vai chamar quando clicar em sair
}

const UserDropdown: React.FC<UserDropdownProps> = ({
	avatarUrl = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
	onLogout,
}) => {
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
					<a className="justify-between">Perfil</a>
				</li>
				<li>
					<a>Configuração</a>
				</li>
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
