import { Metadata } from 'next';
import './globals.css';
import ThemeToggle from './components/theme-toggle/themeToggle';

export const metadata: Metadata = {
	title: 'BrainSmart - Educação de Qualidade',
	description: 'BrainSmart: Escola inovadora focada no futuro dos alunos',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR">
			<body
				className="
    min-h-screen
    transition-colors duration-500
    bg-white text-black

    /* 🎨 Modo synthwave */
    data-[theme=synthwave]:bg-gradient-to-b 
    data-[theme=synthwave]:from-purple-900 
    data-[theme=synthwave]:to-pink-700
    data-[theme=synthwave]:text-pink-100 px-2
  "
			>
				<ThemeToggle />
				{children}
			</body>
		</html>
	);
}
