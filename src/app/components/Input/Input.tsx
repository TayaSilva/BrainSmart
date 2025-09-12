import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', ...rest }) => {
	return (
		<div className="flex flex-col w-full">
			<label className="mb-1 text-white font-medium text-sm">{label}</label>
			<input
				type={type}
				{...rest}
				className="
          w-full
          px-4
          py-2
          border
          border-gray-300
          text-white
          text-sm
          font-normal
          rounded-md
          focus:outline-none
          focus:ring-1
          focus:ring-text-primary
          focus:border-text-primary
          placeholder-gray-400
          transition
          duration-200
          "
			/>
		</div>
	);
};

export default Input;
