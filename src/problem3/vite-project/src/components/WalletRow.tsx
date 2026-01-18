import React from 'react';

interface WalletRowProps {
	currency: string;
	amount: number;
	formattedAmount: string;
	usdValue: number;
	blockchain: string;
	className?: string;
}

const WalletRow: React.FC<WalletRowProps> = ({
	currency,
	amount,
	formattedAmount,
	usdValue,
	blockchain,
	className = '',
}) => {
	const formattedUsd = usdValue.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return (
		<div
			className={`
        flex items-center justify-between 
        p-4 bg-gray-800/40 backdrop-blur-sm 
        border border-gray-700 rounded-xl 
        hover:bg-gray-700/50 transition-colors
        ${className}
      `}
		>
			<div className="flex items-center gap-4">
				<div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
					{currency.slice(0, 2)}
				</div>

				<div>
					<div className="font-semibold text-white text-lg">{currency}</div>
					<div className="text-sm text-gray-400">{blockchain}</div>
				</div>
			</div>

			{/* Right: Amount + USD Value */}
			<div className="text-right">
				<div className="font-medium text-white text-xl">
					{formattedAmount} {currency}
				</div>
				<div className="text-sm text-gray-300">{formattedUsd}</div>
			</div>
		</div>
	);
};

export default WalletRow;
