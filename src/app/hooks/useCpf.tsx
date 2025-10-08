import { useState } from 'react';

function formatCPF(value: string): string {
	const digits = value.replace(/\D/g, '').slice(0, 11);
	return digits
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function isValidCPFLocal(cpf: string): boolean {
	const digits = cpf.replace(/\D/g, '');
	if (digits.length !== 11) return false; // só valida se tiver 11 dígitos
	if (/^(\d)\1{10}$/.test(digits)) return false; // sequências repetidas

	const calc = (base: number) => {
		let sum = 0;
		for (let i = 0; i < base; i++) {
			sum += parseInt(digits[i]) * (base + 1 - i);
		}
		const mod = (sum * 10) % 11;
		return mod === 10 ? 0 : mod;
	};

	const dv1 = calc(9);
	const dv2 = calc(10);

	return dv1 === parseInt(digits[9]) && dv2 === parseInt(digits[10]);
}

export function useCPF(initialValue = '') {
	const [cpf, setCpf] = useState(initialValue);
	const [isValid, setIsValid] = useState(true);

	// só formata enquanto digita
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCpf(formatCPF(e.target.value));
		setIsValid(true); // reseta o erro enquanto digita
	};

	// validação final, no onBlur ou quando precisar
	const handleBlur = () => {
		if (cpf.replace(/\D/g, '').length === 11) {
			setIsValid(isValidCPFLocal(cpf));
		}
	};

	const rawCpf = cpf.replace(/\D/g, '');

	return { cpf, rawCpf, setCpf, handleChange, handleBlur, isValid };
}
