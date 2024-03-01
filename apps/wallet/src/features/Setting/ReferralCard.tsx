import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';
import { ArrowRight, TwoPeople } from '@walless/icons';
import assets from 'utils/assets';
import { navigate } from 'utils/navigation';

const ReferralCard = () => {
	const handleNavigateToReferral = () => {
		navigate('Dashboard', {
			screen: 'Setting',
			params: {
				screen: 'Referral',
			},
		});
	};

	return (
		<ImageBackground
			source={assets.misc.referralGradientBackgroundImage}
			imageStyle={{ borderRadius: 20 }}
			style={styles.container}
			borderRadius={20}
		>
			<View style={styles.iconContainer}>
				<TwoPeople color="#000000" />
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>Unleash Your Influence</Text>
				<Text style={styles.content}>
					Join our Referral Ranks and unlock exclusive benefits for every friend
					you bring to Walless
				</Text>
			</View>
			<TouchableOpacity onPress={handleNavigateToReferral}>
				<ArrowRight color="#ffffff" size={30} />
			</TouchableOpacity>
		</ImageBackground>
	);
};

export default ReferralCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		gap: 12,
		marginVertical: 10,
	},
	contentContainer: {
		flex: 1,
	},
	iconContainer: {
		width: 30,
		height: 30,
		borderRadius: 25,
		backgroundColor: '#ffffff',
		padding: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
		color: '#ffffff',
	},
	content: {
		color: '#ffffff',
	},
});
