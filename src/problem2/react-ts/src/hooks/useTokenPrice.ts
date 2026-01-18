import { useState, useEffect } from 'react';

const MOCK_PRICES: Record<string, number> = {
	ETH: 3850,
	USDC: 1,
	USDT: 1.001,
	WBTC: 102500,
	DAI: 0.999,
};

interface PriceResult {
	price: number | null;
	loading: boolean;
}

export function useTokenPrice(symbol: string | undefined): PriceResult {
	const [price, setPrice] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!symbol) {
			setPrice(null);
			setLoading(false);
			return;
		}

		setLoading(true);

		const timeout = setTimeout(
			() => {
				const foundPrice = MOCK_PRICES[symbol] ?? null;
				setPrice(foundPrice);
				setLoading(false);
			},
			Math.random() * 1200 + 800,
		);

		return () => clearTimeout(timeout);
	}, [symbol]);

	return { price, loading };
}
