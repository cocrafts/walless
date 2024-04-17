import type { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
	timeRemaining: number;
}

const CountDown: FC<Props> = ({ timeRemaining }) => {
	return (
		<Text style={styles.counterText}>
			{Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}
			h:
			{Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))}
			m:
			{Math.floor((timeRemaining % (1000 * 60)) / 1000)}s
		</Text>
	);
};

const styles = StyleSheet.create({
	counterText: {
		fontSize: 11,
		fontWeight: '500',
		color: '#00B1FF',
	},
});

export default CountDown;
