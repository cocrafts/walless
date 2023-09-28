import { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import type { UnknownObject } from '@walless/core';
import type { JoinWaitlistResult } from '@walless/graphql';
import { mutations } from '@walless/graphql';
import { Button, modalActions, Text, View } from '@walless/gui';
import { resources } from 'utils/config';
import { qlClient } from 'utils/graphql';

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
	const [emailErr, setEmailErr] = useState('');
	const [twitter, setTwitter] = useState('');
	const [twitterErr, setTwitterErr] = useState('');
	const [selectedOption, setSelectedOption] = useState('Select one');
	const [selectedOptionErr, setSelectedOptionErr] = useState('');
	const [isCalling, setIsCalling] = useState(false);

	const descriptionOptions = [
		'Content creator',
		'Designer/Artist',
		'Developer',
		'Entrepreneur',
		'Influencer',
		'Trader',
		'Other',
	];

	const handleSubmit = async () => {
		if (isCalling) return;

		let allValid = true;
		const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
		if (email.length === 0) {
			setEmailErr('This field is required');
			allValid = false;
		} else {
			if (!reg.test(email)) {
				setEmailErr('Email is invalid');
				allValid = false;
			}
		}
		if (twitter.length === 0) {
			setTwitterErr('This field is required');
			allValid = false;
		}
		if (!descriptionOptions.includes(selectedOption)) {
			setSelectedOptionErr('This field is required');
			allValid = false;
		}

		if (allValid) {
			setIsCalling(true);

			const twitterHandle = `@${twitter}`;

			const { data, errors } = await qlClient.rawRequest(
				mutations.joinWaitlist,
				{
					email: email,
					twitter: twitterHandle,
					description: selectedOption,
				},
			);

			console.log(data);

			if (errors && errors.length > 0) {
				const message = errors[0].message;

				if (message.includes('duplicate')) {
					if (message.includes('email')) {
						setEmailErr('You are already on the waitlist');
					} else if (message.includes('twitter')) {
						setTwitterErr('Twitter handle already existed');
					}
				}
			} else {
				const response = (data as UnknownObject)
					.joinWaitlist as JoinWaitlistResult;
				modalActions.destroy('signUp');
				modalActions.show({
					id: 'result',
					component: () => (
						<ResultModal waitlistNumber={response.count as number} />
					),
				});
			}
			setIsCalling(false);
		}
	};

	const handleChangeEmail = (text: string) => {
		setEmailErr('');
		setEmail(text);
	};

	const handleChangeTwitter = (text: string) => {
		setTwitterErr('');
		setTwitter(text);
	};

	const handleChangeSelectedOption = (text: string) => {
		setSelectedOptionErr('');
		setSelectedOption(text);
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

			<View>
				<FormInput
					title="Email"
					text={email}
					placeholder="zangimmortal@gmail.com"
					onChangeText={handleChangeEmail}
					onFocus={() => setEmailErr('')}
					error={emailErr}
				/>
				<FormInput
					title="Twitter"
					text={twitter}
					placeholder="zangimmortal"
					onChangeText={handleChangeTwitter}
					onFocus={() => setTwitterErr('')}
					error={twitterErr}
					prefix={<Text style={styles.text}>@</Text>}
				/>
				<InputDropdown
					title="Describe yourself"
					currentOption={selectedOption}
					setCurrentOption={handleChangeSelectedOption}
					optionList={descriptionOptions}
					error={selectedOptionErr}
				/>
			</View>

			{!isCalling ? (
				<Button
					title="Count me in"
					style={styles.button}
					titleStyle={styles.buttonText}
					onPress={handleSubmit}
				/>
			) : (
				<ActivityIndicator style={styles.loading} />
			)}
		</View>
	);
};

export default SignUpModal;

const styles = StyleSheet.create({
	container: {
		maxWidth: 420,
		paddingTop: 44,
		paddingBottom: 32,
		paddingHorizontal: 34,
		backgroundColor: '#19232C',
		borderRadius: 16,
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 6,
		marginBottom: 24,
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
	text: {
		textAlign: 'center',
		color: '#566674',
	},
	logoImage: {
		width: 67,
		height: 35,
	},
	button: {
		marginTop: 10,
		paddingVertical: 12,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: '500',
	},
	loading: {
		paddingVertical: 20,
	},
});
