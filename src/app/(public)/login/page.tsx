'use client';
import Image from 'next/image';
import BackLogin from '@/../public/images/background-login.png';
import BgLogin from '@/../public/images/bg-login.svg';
import GoogleLogo from '@/../public/images/google-logo.png';
import Input from '@/app/components/Input/Input';
import Link from 'next/link';
import GradientButton from '@/app/components/GradientButton/GradientButton';
import { signIn } from 'next-auth/react';

export default function Login() {
	return (
		<div
			className="relative min-h-screen flex items-center justify-center overflow-hidden "
			style={{
				backgroundImage: `url(${BgLogin.src})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className="flex flex-col justify-center w-full md:flex-row z-10 ">
				<div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 rounded-tl-2xl rounded-bl-2xl shadow-2xl p-8 flex flex-col items-center justify-center">
					<h1 className="text-2xl font-bold uppercase">login</h1>
					<button
						onClick={() => signIn('google')}
						className="my-4 cursor-pointer w-full flex items-center justify-center gap-2 bg-white/80 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition"
					>
						<Image src={GoogleLogo} alt="Google Logo" width={20} height={20} />
						Faça login com Google
					</button>
					<div className="flex w-full gap-4 flex-col">
						<Input label="E-mail" type="email" placeholder="example@email.com" />
						<Input label="Senha" type="password" placeholder="Digite sua senha" />
					</div>
					<GradientButton className="my-6">Entrar</GradientButton>
					<div className="mt-4 flex flex-row text-sm gap-1">
						<p>Puts, esqueceu a senha? </p>
						<Link
							href="/"
							className="hover:text-text-primary underline hover:font-semibold"
						>
							Troque aqui
						</Link>
					</div>
				</div>

				<div className="relative z-10 flex-col w-full max-w-md bg-[#EA4C89] border-white/30 border rounded-br-2xl rounded-tr-2xl shadow-2xl p-8 flex items-center justify-center">
					<Image
						src={BackLogin}
						alt="Background Login"
						className="w-[200px]h-[200px]"
					/>
					<div className="mt-4  flex flex-row text-sm gap-1">
						<p>Você AINDA não tem conta? </p>
						<Link
							href="/"
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
