import './bootstrap';

import { connect } from './utils';

export const App = () => {
	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h1>Hello Tezos example dApp</h1>
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
