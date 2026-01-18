// src/components/TokenSelect.tsx
import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import type { Token } from '../types';

interface TokenSelectProps {
	value: string;
	onChange: (symbol: string) => void;
	tokens: Token[];
	label: string;
}

export default function TokenSelect({
	value,
	onChange,
	tokens,
	label,
}: TokenSelectProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');

	const filtered = tokens.filter(
		(t) =>
			t.symbol.toLowerCase().includes(search.toLowerCase()) ||
			t.name.toLowerCase().includes(search.toLowerCase()),
	);

	const selected = tokens.find((t) => t.symbol === value);

	return (
		<div className="relative">
			{label && (
				<label className="block text-sm font-medium text-gray-400 mb-1.5">
					{label}
				</label>
			)}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-3 text-left hover:border-indigo-500/50 transition-colors"
			>
				{selected ? (
					<div className="flex items-center gap-3">
						<img
							src={selected.icon}
							alt={selected.symbol}
							className="w-8 h-8 rounded-full"
						/>
						<div>
							<div className="font-semibold">{selected.symbol}</div>
							<div className="text-xs text-gray-400">{selected.name}</div>
						</div>
					</div>
				) : (
					<span className="text-gray-500">Select token</span>
				)}
				<ChevronDown className="w-5 h-5" />
			</button>

			{isOpen && (
				<div className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
					<div className="p-3 border-b border-gray-800">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search name or symbol..."
								className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
							/>
						</div>
					</div>

					<div className="max-h-72 overflow-y-auto">
						{filtered.map((token) => (
							<button
								key={token.symbol}
								type="button"
								onClick={() => {
									onChange(token.symbol);
									setIsOpen(false);
									setSearch('');
								}}
								className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors"
							>
								<img
									src={token.icon}
									alt={token.symbol}
									className="w-8 h-8 rounded-full"
								/>
								<div>
									<div className="font-medium">{token.symbol}</div>
									<div className="text-xs text-gray-400">{token.name}</div>
								</div>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
