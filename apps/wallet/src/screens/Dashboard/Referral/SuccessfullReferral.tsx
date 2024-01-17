import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	numberOfReferrals: number;
	numberOfActivatedReferrals: number;
}

const SuccessfullReferral: FC<Props> = ({
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

					<Text style={[styles.proportion]}>
						{numberOfActivatedReferrals}/{numberOfReferrals}
					</Text>
				</View>
				<Text style={styles.text}>Level 1</Text>
			</View>
		</View>
	);
};

export default SuccessfullReferral;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#566674',
		gap: 12,
		paddingHorizontal: 12,
		paddingVertical: 16,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
	},
	text: {
		color: '#ffffff',
	},
	measurementContainer: {
		flexDirection: 'row',
		gap: 12,
		justifyContent: 'space-between',
	},
	activeReferral: {
		flex: 1,
		backgroundColor: '#0694D3',
		height: 20,
	},
	referral: {
		flex: 1,
		flexDirection: 'row',
		height: 20,
		borderRadius: 10,
		backgroundColor: '#ffffff',
		overflow: 'hidden',
	},
	proportion: {
		top: 3,
		left: '50%',
		position: 'absolute',
		color: '#000000',
	},
});
