// Below is a detailed list of computational inefficiencies, bugs, and anti-patterns found in the original code:
//
// 1. CRITICAL BUG: Filter logic is completely reversed + uses undefined variable 'lhsPriority'
//    → Almost no balances would pass the filter. ReferenceError due to 'lhsPriority' not defined.
//
// 2. Missing 'blockchain' field in WalletBalance interface
//    → TypeScript error or runtime undefined when accessing balance.blockchain
//
// 3. getPriority uses 'any' type → defeats TypeScript safety
//
// 4. useMemo dependencies include 'prices' but prices is not used inside → unnecessary re-computation
//
// 5. Creates 'formattedBalances' but never uses it → wasted computation
//
// 6. Uses 'index' as key in list → React anti-pattern (unstable, poor performance, potential bugs on re-order)
//
// 7. Sort is unstable (no tie-breaker when priorities are equal)
//
// 8. usdValue calculated repeatedly in render loop (not memoized)
//    → Can cause NaN if price[currency] is undefined
//
// 9. toFixed() without precision → inconsistent decimal places (usually 4-6 for crypto)
//
// 10. No loading/error handling for hooks (assumed in real app)
//
// Improvements applied in this refactored version:
// - Fixed filter logic (keep positive balances with valid priority)
// - Added blockchain to interface
// - Used object map for priorities (cleaner, extensible)
// - Combined formatting + usdValue in one memoized step
// - Stable sort with tie-breaker (alphabet by currency)
// - Proper composite key instead of index
// - Fallback for missing prices (0 instead of NaN)
// - Better decimal formatting (toFixed(4))
// - Kept children rendering (if BoxProps has it)

import React, { useMemo } from 'react';
import WalletRow from './WalletRow';

/*
------ If you want to test, remove this comment and comment out the two lines declaring useWalletBalances and usePrices below. ----

const mockBalances: WalletBalance[] = [
	{ currency: 'ETH', amount: 1.2345, blockchain: 'Ethereum' },
	{ currency: 'OSMO', amount: 250.75, blockchain: 'Osmosis' },
	{ currency: 'ARB', amount: 0, blockchain: 'Arbitrum' }, // Sẽ bị filter vì amount <= 0
	{ currency: 'ZIL', amount: 1500, blockchain: 'Zilliqa' },
	{ currency: 'NEO', amount: 45.67, blockchain: 'Neo' },
];

const mockPrices: Record<string, number> = {
	ETH: 3850,
	OSMO: 1.25,
	ARB: 1.1,
	ZIL: 0.018,
	NEO: 12.5,
};

const useWalletBalances = () => mockBalances;
const usePrices = () => mockPrices;

*/

//
const useWalletBalances = () => [];
const usePrices = (): Record<string, number> => ({});

interface WalletBalance {
	currency: string;
	amount: number;
	blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
	formatted: string;
	usdValue: number;
}

interface Props {
	children?: React.ReactNode;
	className?: string;
}

const BLOCKCHAIN_PRIORITY: Record<string, number> = {
	Osmosis: 100,
	Ethereum: 50,
	Arbitrum: 30,
	Zilliqa: 20,
	Neo: 20,
};

const getPriority = (blockchain: string): number => {
	return BLOCKCHAIN_PRIORITY[blockchain] ?? -99;
};

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
	const balances = useWalletBalances();
	const prices = usePrices();

	const formattedBalances = useMemo(() => {
		return balances
			.filter((balance: WalletBalance) => {
				const priority = getPriority(balance.blockchain);
				return priority > -99 && balance.amount > 0;
			})
			.sort((a: WalletBalance, b: WalletBalance) => {
				const priorityA = getPriority(a.blockchain);
				const priorityB = getPriority(b.blockchain);

				if (priorityA !== priorityB) {
					return priorityB - priorityA;
				}

				return a.currency.localeCompare(b.currency);
			})
			.map((balance: WalletBalance) => {
				const usdValue = (prices[balance.currency] ?? 0) * balance.amount;

				return {
					...balance,
					formatted: balance.amount.toFixed(4),
					usdValue,
				};
			});
	}, [balances, prices]);

	return (
		<div {...rest}>
			{formattedBalances.map((balance: FormattedWalletBalance) => (
				<WalletRow
					key={`${balance.currency}-${balance.blockchain}`}
					currency={balance.currency}
					amount={balance.amount}
					formattedAmount={balance.formatted}
					usdValue={balance.usdValue}
					blockchain={balance.blockchain}
					className={'classes.row'} // if using CSS module
				/>
			))}

			{children}
		</div>
	);
};

export default WalletPage;
