// src/components/UserDropdown.tsx
'use client'; // se for Next.js 13+

import React from 'react';

interface UserDropdownProps {
	avatarUrl?: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
	avatarUrl = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
}) => {
	return (
		<div className="dropdown dropdown-end mt-6">
			<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
				<div className="w-10 rounded-full">
					<img alt="User Avatar" src={avatarUrl} />
				</div>
			</div>
			<ul
				tabIndex={0}
				className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
			>
				<li>
					<a className="justify-between">
						Profile
						<span className="badge">New</span>
					</a>
				</li>
				<li>
					<a>Settings</a>
				</li>
				<li>
					<a>Logout</a>
				</li>
			</ul>
		</div>
	);
};

export default UserDropdown;
