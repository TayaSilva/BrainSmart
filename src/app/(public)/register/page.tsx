'use client';
import { Raleway } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BgRegister from '@/../public/images/bg-register.png';
import BackRegister from '@/../public/images/background-register.png';
import Input from '@/app/components/Input/Input';
import Link from 'next/link';
import GradientButton from '@/app/components/GradientButton/GradientButton';

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['100', '400', '700'],
});

export default function Register() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [nickname, setNickname] = useState('');
	const [email, setEmail] = useState('');
	const [cpf, setCpf] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			const res = await fetch('http://localhost:3001/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, nickname, email, cpf, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error || 'Erro ao registrar');
				return;
			}

			router.push('/login');
		} catch (err) {
			setError('Erro de conexão com o servidor');
			console.error(err);
		}
	};

	return (
		<div
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
			style={{
				backgroundImage: `url(${BgRegister.src})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className="flex flex-col items-stretch justify-center md:flex-row w-full z-10">
				<div className="relative z-10 flex-1 w-full max-w-[550px] bg-white/5 backdrop-blur-md rounded-2xl md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none md:rounded-br-none p-8 flex flex-col items-center justify-center shadow-[20px_20px_25px_rgba(0,0,0,0.5)]">
					<span
						className={raleway.className + ' font-extralight text-2xl uppercase'}
					>
						Cadastre-se
					</span>

					<form
						className="flex w-full items-center gap-4 flex-col mt-4"
						onSubmit={handleRegister}
					>
						<Input
							label="Nome"
							type="text"
							placeholder="Digite seu nome completo"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							label="Apelido"
							type="text"
							placeholder="Como quer ser chamado?"
							value={nickname}
							onChange={(e) => setNickname(e.target.value)}
						/>
						<Input
							label="Email"
							type="email"
							placeholder="Digite seu email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							label="CPF"
							type="text"
							placeholder="Digite seu CPF"
							value={cpf}
							onChange={(e) => setCpf(e.target.value)}
							mask="###.###.###-##"
						/>
						<Input
							label="Senha"
							type="password"
							placeholder="Digite sua senha"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && <p className="text-red-500 text-sm">{error}</p>}
						<GradientButton
							type="submit"
							className="my-6 w-[150px] shadow-[20px_20px_25px_rgba(0,0,0,0.5)]"
						>
							Cadastrar
						</GradientButton>
					</form>

					<div className="mt-4 flex flex-row items-end text-sm gap-1">
						<p className={raleway.className}>Já tem conta?</p>
						<Link
							href="/login"
							className={raleway.className + ' hover:underline ml-1'}
						>
							Faça login
						</Link>
					</div>
				</div>

				<div className="hidden md:flex relative z-10 flex-1 flex-col max-w-[400px] shadow-[20px_20px_25px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[#ff1f70] to-[#7c00ff] rounded-br-2xl rounded-tr-2xl p-8 items-center justify-between">
					<span
						className={raleway.className + ' font-extralight text-2xl uppercase'}
					>
						Seja bem-vindo(a)
					</span>

					<span
						className={raleway.className + ' mt-6 text-2xl uppercase text-center'}
					>
						Junte-se a nós!
					</span>
				</div>
			</div>

			<div className="absolute top-4 right-4 w-fit text-white/90 flex flex-col items-center">
				<h2 className={raleway.className + ' text-2xl'}>BrainSmart</h2>
				<p className={raleway.className + ' font-extralight text-sm text-center'}>
					Sua mente no comando da tecnologia
				</p>
			</div>
		</div>
	);
}
