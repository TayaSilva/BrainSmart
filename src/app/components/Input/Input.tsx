import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	minLength?: number;
	maxLength?: number;
	mask?: string;
}

const Input: React.FC<InputProps> = ({
	label,
	type = 'text',
	minLength,
	maxLength,
	mask,
	...rest
}) => {
	const [value, setValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value;

		if (type === 'number') {
			val = val.replace(/\D/g, '');
		} else if (type === 'text') {
			val = val.replace(/[^a-zA-Z\s]/g, '');
		}

		if (mask) {
			let maskedValue = '';
			let i = 0;
			for (const m of mask) {
				if (m === '#') {
					if (val[i]) maskedValue += val[i++];
				} else {
					maskedValue += m;
				}
			}
			val = maskedValue;
		}

		if (maxLength) {
			val = val.slice(0, maxLength);
		}

		setValue(val);
	};

	return (
		<div className="flex flex-col w-full">
			<label className="mb-1 text-white font-medium text-sm">{label}</label>
			<input
				type="text"
				value={value}
				minLength={minLength}
				maxLength={maxLength}
				onChange={handleChange}
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
