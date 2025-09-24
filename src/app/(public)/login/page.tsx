'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackLogin from '@/../public/images/background-login.png';
import BgLogin from '@/../public/images/bg-login.svg';
import GoogleLogo from '@/../public/images/google-logo.png';
import Input from '@/app/components/Input/Input';
import Link from 'next/link';
import GradientButton from '@/app/components/GradientButton/GradientButton';
import { signIn } from 'next-auth/react';

export default function Login() {
	const router = useRouter();

	// Estados do formulário
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	// Função de login
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			const res = await fetch('http://localhost:3001/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error || 'Erro ao fazer login');
				return;
			}

			localStorage.setItem('token', data.token);

			router.push('/');
		} catch (err) {
			setError('Erro de conexão com o servidor');
			console.error(err);
		}
	};

	return (
		<div
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
			style={{
				backgroundImage: `url(${BgLogin.src})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className="flex flex-col items-center  justify-center md:flex-row w-full z-10">
				{/* Formulário */}
				<div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border  border-white/30 rounded-2xl md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none md:rounded-br-none shadow-2xl p-8 flex flex-col items-center justify-center">
					<button
						onClick={() => signIn('google')}
						className="my-4 cursor-pointer w-full flex items-center justify-center gap-2 bg-white/80 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition"
					>
						<Image src={GoogleLogo} alt="Google Logo" width={20} height={20} />
						Faça login com Google
					</button>

					<form className="flex w-full gap-4 flex-col" onSubmit={handleLogin}>
						<Input
							label="E-mail"
							type="email"
							placeholder="example@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							label="Senha"
							type="password"
							placeholder="Digite sua senha"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && <p className="text-red-500 text-sm">{error}</p>}
						<GradientButton type="submit" className="my-6">
							Entrar
						</GradientButton>
					</form>

					<div className="mt-4 flex flex-row text-sm gap-1">
						<p>Puts, esqueceu a senha? </p>
						<Link
							href="/"
							className="hover:text-text-primary underline hover:font-semibold"
						>
							Troque aqui
						</Link>
					</div>

					<div className="mt-4 flex flex-row text-sm gap-1 md:hidden">
						<p>Você AINDA não tem conta? </p>
						<Link
							href="/register"
							className="hover:text-primary underline hover:font-semibold"
						>
							Registre-se
						</Link>
					</div>
				</div>

				<div className="hidden md:flex relative z-10 flex-col h-[418px] w-full max-w-md bg-[#EA4C89] border-white/30 border rounded-br-2xl rounded-tr-2xl shadow-2xl p-8 items-center justify-center">
					<Image
						src={BackLogin}
						alt="Background Login"
						className="w-[300px] h-[300px] shrink-0"
					/>
					<div className="mt-8 flex flex-row text-sm gap-1">
						<p>Você AINDA não tem conta? </p>
						<Link
							href="/register"
							className="hover:text-primary underline hover:font-semibold"
						>
							Registre-se
						</Link>
					</div>
				</div>
			</div>

			<div className="absolute top-4 right-4 w-fit text-white/90 flex flex-col items-center">
				<h2 className="text-2xl font-bold">BrainSmart</h2>
				<p className="text-sm text-center">Sua mente no comando da tecnologia</p>
			</div>
		</div>
	);
}
