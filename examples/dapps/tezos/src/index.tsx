import { useEffect } from 'react';

import './bootstrap';

import { connect } from './utils';

export const App = () => {
	useEffect(() => {
		window.postMessage('hello world from tezos example');
	}, []);

	// useEffect(() => {
	// 	window.addEventListener('message', async (e) => {
	// 		console.log('Walless ext - on message:', e.data, e.origin);
	// 	});
	// }, []);

	return (
		<div
			style={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h1 style={{ textAlign: 'center' }}>Example dApp on Tezos</h1>
			<button
				style={{
					paddingTop: 14,
					paddingBottom: 14,
					paddingLeft: 30,
					paddingRight: 30,
				}}
				onClick={connect}
			>
				Connect
			</button>
		</div>
	);
};

export default App;
