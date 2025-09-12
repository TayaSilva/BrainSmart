'use client';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const GradientButton: React.FC<ButtonProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<button
			{...props}
			className={`
        bg-gradient-to-r from-purple-500 via-pink-500 to-[#26335D]
        text-white font-semibold py-2 px-6 rounded-lg shadow-lg
        transform transition-all duration-300 ease-in-out
        hover:scale-105 hover:brightness-110 hover:shadow-2xl cursor-pointer
        ${className || ''}
      `}
		>
			{children}
		</button>
	);
};

export default GradientButton;
