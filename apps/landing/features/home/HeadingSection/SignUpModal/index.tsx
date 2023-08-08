import { Image, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';

import FormInput from './FormInput';
import InputDropdown from './InputDropdown';

const SignUpModal = () => {
	const desciptionOptions = [
		'Photographer',
		'Content creator',
		'Influencer',
		'Designer',
		'Other',
	];

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					source={{ uri: '/img/walless-icon.svg' }}
					style={styles.logoImage}
				/>
				<Text style={[styles.text, styles.title]}>
					Sign up for early access
				</Text>
				<Text style={styles.text}>
					Shorter time to Alpha. Join our waitlist and enjoy Walless latest
					updates and exclusive perks.
				</Text>
			</View>

			<View style={styles.contentContainer}>
				<FormInput title="Email" placeholder="@wallessbio" />
				<FormInput title="Twitter" placeholder="@wallessbio" />
				<InputDropdown
					title="Describe yourself"
					optionList={desciptionOptions}
				/>
			</View>
			<Button
				style={{ zIndex: -1 }}
				title="Count me in"
				titleStyle={styles.buttonText}
			/>
		</View>
	);
};

export default SignUpModal;

const styles = StyleSheet.create({
	container: {
		width: '95%',
		maxWidth: 440,
		margin: 'auto',
		padding: 32,
		backgroundColor: '#19232C',
		borderRadius: 16,
		gap: 24,
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 6,
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
	},
	contentContainer: {
		gap: 12,
	},
	text: {
		textAlign: 'center',
	},
	logoImage: {
		width: 67,
		height: 35,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: '500',
	},
});
