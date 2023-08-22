import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Twitter } from '@walless/icons';
import { resources } from 'utils/config';

interface Props {
	waitlistNumber: number;
}

const ResultModal: FC<Props> = ({ waitlistNumber }) => {
	const formatWaitlistNumber = (num: number) => {
		let numStr = num.toString();
		if (numStr.length < 5) {
			numStr =
				Array(5 - numStr.length)
					.fill('0')
					.join('') + numStr;
		}

		return numStr;
	};

	const twitterUrl = `https://twitter.com/intent/tweet?text=I've snagged a spot on @walless_wallet waitlist and be eligible for Weekly raffles. You don’t want to miss this web3 revolutionary! 🚀 Let's all go %23Walless together, start from👇&url=https://walless.io/${formatWaitlistNumber(
		waitlistNumber,
	)}`;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={resources.walless.icon} style={styles.logoImage} />
				<Text style={styles.title}>Yayyy! You&apos;re on the list!</Text>
				<Text style={styles.text}>
					We&apos;re happy to have you here. You&apos;ll receive a confirmation
					email shortly. Share this to your fellow explorers :)
				</Text>
			</View>

			<View style={styles.resultContainer}>
				<View style={styles.resultImageContainer}>
					<Image
						source={resources.walless.signUpIcon}
						style={styles.resultImage}
					/>
				</View>

				<Text style={styles.waitlistNumber}>
					#{formatWaitlistNumber(waitlistNumber)}
				</Text>
			</View>

			<a target="_blank" href={twitterUrl} rel="noreferrer">
				<Button style={styles.button}>
					<Twitter size={36} />
					<Text style={styles.buttonText}>Share on Twitter</Text>
				</Button>
			</a>
		</View>
	);
};

export default ResultModal;

const styles = StyleSheet.create({
	container: {
		maxWidth: 420,
		paddingTop: 44,
		paddingBottom: 20,
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
		color: '#ffffff',
		fontWeight: '600',
		marginTop: 10,
	},
	logoImage: {
		width: 67,
		height: 35,
	},
	text: {
		color: '#566674',
		textAlign: 'center',
	},
	waitlistNumber: {
		marginLeft: 4,
		fontSize: 50,
		fontWeight: '500',
		color: '#ffffff',
	},
	resultContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#111416',
		padding: 10,
		gap: 6,
		borderRadius: 20,
	},
	resultImageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 100,
		backgroundColor: '#131C24',
		borderRadius: 16,
	},
	resultImage: {
		width: 60,
		height: 30,
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 9,
		borderRadius: 16,
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: '500',
	},
});
