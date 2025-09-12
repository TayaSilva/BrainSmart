'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Background1 from '@/../public/images/background-1.png';
import Background2 from '@/../public/images/background-2.png';
import loadingAnimation from '@/../public/gifs/lFxEdhppZb.json';
import Lottie from 'lottie-react';

export default function Home() {
	const loadingPhrases = [
		'O próximo clique pode mudar seu futuro!',
		'Aprender é o melhor upgrade que você pode fazer.',
		'Seu esforço de hoje é seu sucesso de amanhã.',
	];

	const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
	const [fade, setFade] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false);
			setTimeout(() => {
				setCurrentPhraseIndex((prevIndex) =>
					prevIndex === loadingPhrases.length - 1 ? 0 : prevIndex + 1
				);
				setFade(true);
			}, 500);
		}, 5000);

		return () => clearInterval(interval);
	}, [loadingPhrases.length]);

	return (
		<div className="relative flex flex-col items-center justify-center min-h-screen p-24 bg-primary">
			<div className="absolute bottom-100 left-0">
				<Image src={Background1} alt="Background Left" />
			</div>
			<div className="absolute bottom-200 right-0">
				<Image src={Background2} alt="Background Right" />
			</div>

			<div className="z-10 flex flex-col items-center">
				<h1 className="text-4xl text-white font-bold">
					Seja bem-vindo(a) ao BrainSmart
				</h1>

				<p
					className={`mt-4 text-white text-center transition-opacity duration-500 ${
						fade ? 'opacity-100' : 'opacity-0'
					}`}
				>
					{loadingPhrases[currentPhraseIndex]}
				</p>

				<Lottie
					animationData={loadingAnimation}
					loop={true}
					className="w-[280px] h-40 mt-6"
				/>
			</div>
		</div>
	);
}
