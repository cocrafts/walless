import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@walless/gui';
import { sharedStyles } from 'utils/style';

import { countdownHeight, formatCountdownTime } from './utils';

interface Props {
	remainingTime: number;
}

const Countdown: FC<Props> = ({ remainingTime }) => {
	return (
		<View style={styles.container}>
			<Text style={[sharedStyles.fontSize12, sharedStyles.textCta]}>
				{formatCountdownTime(remainingTime, {
					hours: true,
					minutes: true,
					seconds: false,
				})}
			</Text>
		</View>
	);
};

export default Countdown;

const styles = StyleSheet.create({
	container: {
		height: countdownHeight,
		borderRadius: countdownHeight / 2,
		backgroundColor: '#19232C',
		paddingHorizontal: 12,
		...sharedStyles.flexCenter,
	},
});
