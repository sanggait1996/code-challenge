import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { ArrowDownUp, Loader2 } from 'lucide-react';
import TokenSelect from './TokenSelect';
import { tokens } from '../data/mockTokens';
import { useTokenPrice } from '../hooks/useTokenPrice';
import { motion } from 'framer-motion';

const schema = z.object({
	fromToken: z.string().min(1, 'Required'),
	toToken: z.string().min(1, 'Required'),
	amount: z
		.string()
		.regex(/^\d*\.?\d*$/, 'Invalid number')
		.min(1, 'Required'),
});

type FormData = z.infer<typeof schema>;

export default function SwapCard() {
	const [isSwapping, setIsSwapping] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			fromToken: 'ETH',
			toToken: 'USDC',
			amount: '',
		},
	});

	const fromToken = watch('fromToken');
	const toToken = watch('toToken');
	const amount = watch('amount');

	const { price: fromPrice } = useTokenPrice(fromToken);
	const { price: toPrice, loading: toPriceLoading } = useTokenPrice(toToken);

	const estimatedOut =
		fromPrice && toPrice && amount
			? ((Number(amount) * fromPrice) / toPrice).toFixed(6)
			: '';

	const onSubmit = (data: FormData) => {
		setIsSwapping(true);
		setTimeout(() => {
			alert(
				`Swap successful!\n${data.amount} ${data.fromToken} → ${estimatedOut} ${data.toToken}`,
			);
			setIsSwapping(false);
		}, 2200);
	};

	const swapTokens = () => {
		const temp = fromToken;
		setValue('fromToken', toToken);
		setValue('toToken', temp);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full max-w-md mx-auto bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
		>
			<div className="p-8">
				<h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
					Swap
				</h1>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6"
				>
					{/* From */}
					<div className="bg-gray-950/70 border border-gray-800 rounded-xl p-5">
						<div className="flex justify-between mb-2">
							<span className="text-sm text-gray-400">You pay</span>
							{fromPrice && amount && (
								<span className="text-sm text-gray-400">
									≈ ${(Number(amount) * fromPrice).toFixed(2)}
								</span>
							)}
						</div>
						<div className="flex gap-4">
							<input
								{...register('amount')}
								placeholder="0.0"
								className="bg-transparent text-3xl font-medium w-full outline-none"
							/>
							<TokenSelect
								value={fromToken}
								onChange={(v) => setValue('fromToken', v)}
								tokens={tokens}
								label=""
							/>
						</div>
						{errors.amount && (
							<p className="text-red-400 text-sm mt-1">
								{errors.amount.message}
							</p>
						)}
					</div>

					{/* Swap arrow */}
					<div className="flex justify-center -my-4 relative z-10">
						<button
							type="button"
							onClick={swapTokens}
							className="bg-gray-900 border-4 border-gray-950 rounded-full p-3 hover:scale-110 transition-transform"
						>
							<ArrowDownUp className="w-6 h-6" />
						</button>
					</div>

					{/* To */}
					<div className="bg-gray-950/70 border border-gray-800 rounded-xl p-5">
						<div className="flex justify-between mb-2">
							<span className="text-sm text-gray-400">You receive</span>
							{toPriceLoading ? (
								<Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
							) : (
								estimatedOut && (
									<span className="text-sm text-gray-400">
										≈ ${(Number(estimatedOut) * (toPrice || 1)).toFixed(2)}
									</span>
								)
							)}
						</div>
						<div className="flex gap-4">
							<div className="text-3xl font-medium w-full">
								{estimatedOut || '0.0'}
							</div>
							<TokenSelect
								value={toToken}
								onChange={(v) => setValue('toToken', v)}
								tokens={tokens}
								label=""
							/>
						</div>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={
							isSwapping || !amount || !fromToken || !toToken || toPriceLoading
						}
						className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
					>
						{isSwapping ? (
							<>
								<Loader2 className="w-5 h-5 animate-spin" />
								Swapping...
							</>
						) : (
							'Swap Now'
						)}
					</button>
				</form>
			</div>
		</motion.div>
	);
}
