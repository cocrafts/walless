import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { formatCountdownTime } from '../internal';

interface Props {
	initialTimeRemaining: number;
}

const CountDown: FC<Props> = ({ initialTimeRemaining }) => {
	const [timeRemaining, setTimeRemaining] =
		useState<number>(initialTimeRemaining);

	useEffect(() => {
		const interval = setInterval(() => {
			if (timeRemaining > 0) {
				setTimeRemaining((prev) => prev - 1000);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [initialTimeRemaining]);

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
