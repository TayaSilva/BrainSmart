import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'BrainSmart - Educação de Qualidade',
	description: 'BrainSmart: Escola inovadora focada no futuro dos alunos',
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="pt-BR">
			<body className="antialiased">{children}</body>
		</html>
	);
}
