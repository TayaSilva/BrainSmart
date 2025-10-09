'use client';

import { useEffect, useState } from 'react';
import avatarOptions from '@/data/avatars';

export default function Profile() {
	const defaultAvatar = avatarOptions[0]; // "1.png"
	const [userId, setUserId] = useState<string | null>(null);
	const [name, setName] = useState('');
	const [nickname, setNickname] = useState('');
	const [email, setEmail] = useState('');
	const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar);
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');

	useEffect(() => {
		const storedId = localStorage.getItem('userId');
		setUserId(storedId);

		if (storedId) fetchUser(storedId);
	}, []);

	const fetchUser = async (id: string) => {
		try {
			const res = await fetch(`http://localhost:3001/auth/user/${id}`);
			const data = await res.json();

			setName(data.name || '');
			setNickname(data.nickname || '');
			setEmail(data.email || '');
			setSelectedAvatar(data.avatar || defaultAvatar);

			// salva avatar no localStorage pra navbar
			localStorage.setItem('userAvatar', data.avatar || defaultAvatar);
		} catch (err) {
			console.error('Erro ao carregar usuário:', err);
		}
	};

	const handleSave = async () => {
		if (!userId) return;
		setLoading(true);
		setSuccessMsg('');

		try {
			const res = await fetch(`http://localhost:3001/auth/user/${userId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					nickname,
					email,
					avatar: selectedAvatar,
				}),
			});

			if (!res.ok) throw new Error('Erro ao atualizar perfil');

			setSuccessMsg('Perfil atualizado com sucesso! ✨');
			localStorage.setItem('userAvatar', selectedAvatar); // atualiza navbar
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	// Cria lista de avatares sem duplicar o selecionado se for o default
	const filteredAvatars = avatarOptions.filter(
		(a) => !(a === defaultAvatar && a === selectedAvatar)
	);

	return (
		<div className="max-w-xl mx-auto bg-base-100/85 shadow-md rounded-xl p-8 mt-10">
			<h2 className="text-2xl font-semibold text-center mb-6">Editar Perfil</h2>

			<div className="flex flex-col items-center mb-6">
				<img
					src={selectedAvatar}
					alt="Avatar selecionado"
					className="w-24 h-24 rounded-full border-4 border-primary mb-4"
				/>
				<div className="flex gap-2 justify-center flex-wrap">
					{filteredAvatars.map((avatar, i) => (
						<button
							key={i}
							onClick={() => setSelectedAvatar(avatar)}
							className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-200 ${
								selectedAvatar === avatar
									? 'border-primary scale-110'
									: 'border-base-300 hover:border-primary/50'
							}`}
						>
							<img
								src={avatar}
								alt={`Avatar ${i + 1}`}
								className="w-full h-full object-cover"
							/>
						</button>
					))}
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">Nome</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="input input-bordered w-full"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">Nickname</label>
					<input
						type="text"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						className="input input-bordered w-full"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="input input-bordered w-full"
					/>
				</div>
			</div>

			<button
				onClick={handleSave}
				className="btn btn-primary w-full mt-6"
				disabled={loading}
			>
				{loading ? 'Salvando...' : 'Salvar Alterações'}
			</button>

			{successMsg && (
				<p className="text-green-500 text-center mt-4 font-medium">{successMsg}</p>
			)}
		</div>
	);
}
