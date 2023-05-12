import { Path, Svg } from 'react-native-svg';

const RemoveSymbol = () => {
	return (
		<Svg width="17" height="10" viewBox="0 0 17 10" fill="none">
			<Path
				d="M4.47257 0.448641C4.75459 0.161653 5.14009 0 5.54245 0H15.5C16.3284 0 17 0.671573 17 1.5V8.5C17 9.32843 16.3284 10 15.5 10H5.54245C5.14009 10 4.75459 9.83835 4.47257 9.55136L1.03316 6.05136C0.459666 5.46776 0.459666 4.53224 1.03316 3.94864L4.47257 0.448641Z"
				fill="#203C4E"
			/>
			<Path
				d="M12 3L8 7"
				stroke="#4E758E"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M8 3L12 7"
				stroke="#4E758E"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default RemoveSymbol;
