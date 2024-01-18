import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	numberOfReferrals: number;
	numberOfActivatedReferrals: number;
}

const barHeight = 16;

const SuccessfulReferral: FC<Props> = ({
	numberOfActivatedReferrals,
	numberOfReferrals,
}) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>Successful referral</Text>
			<View style={styles.measurementContainer}>
				<View style={styles.referral}>
					{Array.from({ length: numberOfReferrals }).map((_, index) => {
						const isActivated = index < numberOfActivatedReferrals;
						return (
							<View
								key={index}
								style={isActivated ? styles.activeReferral : styles.referral}
							/>
						);
					})}

					<Text style={[styles.proportionText]}>
						{numberOfActivatedReferrals}/{numberOfReferrals}
					</Text>
				</View>
				<Text style={styles.text}>Level 1</Text>
			</View>
		</View>
	);
};

export default SuccessfulReferral;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#566674',
		gap: 12,
		padding: 12,
	},
	title: {
		fontSize: 12,
		fontWeight: '500',
	},
	text: {
		fontSize: 10,
		color: '#ffffff',
	},
	measurementContainer: {
		flexDirection: 'row',
		gap: 12,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	activeReferral: {
		flex: 1,
		backgroundColor: '#0694D3',
		height: barHeight,
	},
	referral: {
		flex: 1,
		flexDirection: 'row',
		height: barHeight,
		borderRadius: barHeight / 2,
		backgroundColor: '#ffffff',
		overflow: 'hidden',
	},
	proportionText: {
		fontSize: 10,
		top: 3,
		left: '50%',
		position: 'absolute',
		color: '#000000',
	},
});
