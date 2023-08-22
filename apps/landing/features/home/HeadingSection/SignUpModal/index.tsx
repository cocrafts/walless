import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, modalActions, Text, View } from '@walless/gui';
import { resources } from 'utils/config';

import ResultModal from '../Result';

import FormInput from './FormInput';
import InputDropdown from './InputDropdown';

export const handleShowSignUpModal = () => {
	modalActions.show({
		id: 'signUp',
		component: () => <SignUpModal />,
	});
};

const SignUpModal = () => {
	const [email, setEmail] = useState('');
	const [twitter, setTwitter] = useState('');
	const [selectedOption, setSelectedOption] = useState('Select one');

	const descriptionOptions = [
		'Photographer',
		'Content creator',
		'Influencer',
		'Designer',
		'Other',
	];

	const handleSubmit = () => {
		if (email.length === 0) {
			console.log('email');
		} else if (twitter.length === 0) {
			console.log('twitter');
		} else if (selectedOption === 'Select one') {
			console.log('description');
		} else {
			// we'll call api here to send email and calculate waitlist number
			modalActions.show({
				id: 'result',
				component: () => <ResultModal waitlistNumber={130613} />,
			});
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={resources.walless.icon} style={styles.logoImage} />
				<Text style={styles.title}>Sign up for early access</Text>
				<Text style={[styles.text, styles.description]}>
					Shorter time to Alpha. Join our waitlist and enjoy the latest updates
					and exclusive perks.
				</Text>
			</View>

			<View style={styles.contentContainer}>
				<FormInput
					title="Email"
					placeholder="zangimmortal@gmail.com"
					onChangeText={setEmail}
				/>
				<FormInput
					title="Twitter"
					placeholder="@zangimmortal"
					onChangeText={setTwitter}
				/>
				<InputDropdown
					title="Describe yourself"
					currentOption={selectedOption}
					setCurrentOption={setSelectedOption}
					optionList={descriptionOptions}
				/>
			</View>

			<Button
				title="Count me in"
				style={styles.button}
				titleStyle={styles.buttonText}
				onPress={handleSubmit}
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
		paddingTop: 44,
		paddingBottom: 32,
		paddingHorizontal: 34,
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
		color: '#ffffff',
		marginTop: 16,
		marginBottom: 2,
	},
	description: {
		lineHeight: 18,
	},
	contentContainer: {
		gap: 12,
	},
	text: {
		textAlign: 'center',
		color: '#566674',
	},
	logoImage: {
		width: 67,
		height: 35,
	},
	button: {
		paddingVertical: 12,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: '500',
	},
});
