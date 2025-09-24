'use client';
import { Raleway } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackLogin from '@/../public/images/background-login.png';
import BgLogin from '@/../public/images/bg-login.png';
import GoogleLogo from '@/../public/images/google-logo.png';
import Input from '@/app/components/Input/Input';
import Link from 'next/link';
import GradientButton from '@/app/components/GradientButton/GradientButton';
import { signIn } from 'next-auth/react';

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['100', '400', '700'],
});

export default function Login() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

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
			<div className="flex flex-col items-stretch justify-center md:flex-row w-full z-10">
				{/* Lado do login */}
				<div className="relative z-10 flex-1 w-full max-w-[550px] bg-white/5 backdrop-blur-md rounded-2xl md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none md:rounded-br-none p-8 flex flex-col items-center justify-center shadow-[20px_20px_25px_rgba(0,0,0,0.5)]">
					<span
						className={raleway.className + ' font-extralight text-2xl uppercase'}
					>
						Login
					</span>
					<button
						onClick={() => signIn('google')}
						className="my-4 cursor-pointer w-full flex items-center justify-center gap-2 bg-white/90 text-gray-800 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition shadow-[20px_20px_25px_rgba(0,0,0,0.5)]"
					>
						<Image src={GoogleLogo} alt="Google Logo" width={20} height={20} />
						Faça login com Google
					</button>

					<form
						className="flex w-full items-center gap-4 flex-col"
						onSubmit={handleLogin}
					>
						<Input
							label="E-mail"
							type="email"
							placeholder="example@email.com"
							value={email}
							className="bg"
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
						<GradientButton
							type="submit"
							className="my-6 w-[150px] shadow-[20px_20px_25px_rgba(0,0,0,0.5)]"
						>
							Entrar
						</GradientButton>
					</form>

					<div className="mt-4 flex flex-row items-end text-sm gap-1">
						<Link href="/" className={raleway.className + '  hover:underline'}>
							Esqueceu a senha?
						</Link>
					</div>
				</div>

				{/* Lado de boas-vindas */}
				<div className="hidden md:flex relative z-10 flex-1 flex-col max-w-[400px] shadow-[20px_20px_25px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[#ff1f70] to-[#7c00ff] rounded-br-2xl rounded-tr-2xl  p-8 items-center justify-between">
					<span
						className={raleway.className + ' font-extralight text-2xl uppercase'}
					>
						Seja Bem vindo(a)
					</span>
					<span className={raleway.className + '  mt-6 text-3xl uppercase'}>
						Novo login?
					</span>
					<button
						className="bg-white/85  transform transition-all duration-300 ease-in-out
        hover:scale-105 text-gray-900 w-[150px] mb-[60px] cursor-pointer backdrop-blur-md py-2 px-6 rounded-full  flex items-center justify-center shadow-[0_20px_25px_rgba(0,0,0,0.5)]"
					>
						<Link href="/register">Criar conta</Link>
					</button>
				</div>
			</div>

			<div className="absolute top-4 right-4 w-fit text-white/90 flex flex-col items-center">
				<h2 className={raleway.className + '  text-2xl '}>BrainSmart</h2>
				<p className={raleway.className + ' font-extralight text-sm text-center'}>
					Sua mente no comando da tecnologia
				</p>
			</div>
		</div>
	);
}
