'use client';

import UserDropdown from './components/user-dropdown/UserDropdown';

export default function Home() {
	const nickname = 'JhonVi';
	return (
		<div>
			<div className="flex gap-6 justify-end items-center">
				<span> Seja bem vindo (a) {nickname}</span> <UserDropdown />
			</div>
		</div>
	);
}
