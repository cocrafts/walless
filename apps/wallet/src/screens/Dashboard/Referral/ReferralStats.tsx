import type { FC } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { AnimatedView, Text, View } from '@walless/gui';

interface Props {
	currentPoints: number;
	goalPoints: number;
}

const barHeight = 16;

const ReferralStats: FC<Props> = ({ currentPoints, goalPoints }) => {
	const lengthBar = useSharedValue(0);

	const activeReferralStyle = useAnimatedStyle(() => {
		return {
			width: lengthBar.value * (currentPoints / goalPoints),
		};
	}, [lengthBar, goalPoints, currentPoints]);

	const handleLayout = (event: LayoutChangeEvent) => {
		lengthBar.value = event.nativeEvent.layout.width;
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={[styles.text, styles.title]}>Your Influence Meter</Text>
				<Text>Goal {goalPoints} points</Text>
			</View>

			<View onLayout={handleLayout} style={styles.referral}>
				<AnimatedView style={[styles.activeReferral, activeReferralStyle]} />
			</View>

			<View style={styles.levelContainer}>
				<Text style={styles.levelText}>Level 0</Text>

				<View style={styles.levelContainer}>
					<Text style={styles.leftPoint}>
						{goalPoints - currentPoints} points to{' '}
					</Text>
					<Text style={styles.levelText}>Level 1</Text>
				</View>
			</View>
		</View>
	);
};

export default ReferralStats;

const styles = StyleSheet.create({
	container: {
		gap: 12,
		padding: 12,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	title: {
		fontSize: 18,
	},
	text: {
		fontSize: 10,
		color: '#ffffff',
	},
	activeReferral: {
		backgroundColor: '#0694D3',
		height: barHeight,
		borderRadius: barHeight / 2,
	},
	referral: {
		flex: 1,
		flexDirection: 'row',
		height: barHeight,
		borderRadius: barHeight / 2,
		backgroundColor: '#ffffff',
		overflow: 'hidden',
	},
	levelContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 4,
	},
	levelText: {
		color: '#0694D3',
	},
	leftPoint: {
		color: '#798997',
	},
});
