import WalletPage from './components/WalletPage';
function App() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
			<header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 py-6 px-8">
				<div className="max-w-6xl mx-auto">
					<h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
						Wallet Balances Dashboard
					</h1>
					<p className="text-center text-gray-400 mt-2">
						Test Problem 3 - Refactored & Clean React Version
					</p>
				</div>
			</header>

			<main className="max-w-4xl mx-auto py-12 px-6">
				<WalletPage />
			</main>
		</div>
	);
}

export default App;
