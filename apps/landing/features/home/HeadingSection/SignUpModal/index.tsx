import { useEffect, useState } from 'react';
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
	const [isActivate, setIsActivate] = useState(false);

	const desciptionOptions = [
		'Photographer',
		'Content creator',
		'Influencer',
		'Designer',
		'Other',
	];

	const handleSubmit = () => {
		// we'll call api here to send email and calculate waitlist number
		modalActions.destroy('signUp');
		modalActions.show({
			id: 'result',
			component: () => <ResultModal waitlistNumber={130613} />,
		});
	};

	useEffect(() => {
		if (
			email.length === 0 ||
			twitter.length === 0 ||
			selectedOption === 'Select one'
		)
			setIsActivate(false);
		else setIsActivate(true);
	}, [email, twitter, selectedOption]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={resources.walless.icon} style={styles.logoImage} />
				<Text style={[styles.text, styles.title]}>
					Sign up for early access
				</Text>
				<Text style={styles.text}>
					Shorter time to Alpha. Join our waitlist and enjoy Walless latest
					updates and exclusive perks.
				</Text>
			</View>

			<View style={styles.contentContainer}>
				<FormInput
					title="Email"
					placeholder="@wallessbio"
					onChangeText={setEmail}
				/>
				<FormInput
					title="Twitter"
					placeholder="@wallessbio"
					onChangeText={setTwitter}
				/>
				<InputDropdown
					title="Describe yourself"
					currentOption={selectedOption}
					setCurrentOption={setSelectedOption}
					optionList={desciptionOptions}
				/>
			</View>

			<Button
				disabled={!isActivate}
				title="Count me in"
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
		color: '#ffffff',
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
	buttonText: {
		fontSize: 18,
		fontWeight: '500',
	},
});
