import type { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

import { formatCountdownTime } from './utils';

interface Props {
	timeRemaining: number;
}

const CountDown: FC<Props> = ({ timeRemaining }) => {
	return (
		<Text style={styles.counterText}>{formatCountdownTime(timeRemaining)}</Text>
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
