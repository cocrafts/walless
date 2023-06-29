import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text, View } from '@walless/gui';

const EmailSubscription = () => {
	const [email, setEmail] = useState('');
	const [registered, setRegistered] = useState(false);

	const isValidEmail = (email: string) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const handleRegister = () => {
		setRegistered(isValidEmail(email));
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.title, styles.boldWhite]}>
				We don&apos;t want you to miss latest{' '}
				<Text style={styles.highlight}>updates</Text>!
			</Text>
			{registered ? (
				<Text style={styles.registeredText}>
					Thanks for signing up. We&apos;ll keep you posted with Walless latest
					updates and exclusive perks.
				</Text>
			) : (
				<View style={styles.submitContainer}>
					<Input
						style={styles.input}
						inputStyle={{ color: '#fff' }}
						placeholder="Enter your email"
						onChangeText={(email) => setEmail(email)}
					/>
					<Button
						style={[
							styles.submitButton,
							isValidEmail(email) && styles.validBackground,
						]}
						titleStyle={styles.boldWhite}
						title="Count me in"
						onPress={handleRegister}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-end',
		gap: 28,
	},
	boldWhite: {
		fontWeight: 'bold',
		color: '#fff',
	},
	title: {
		fontSize: 24,
	},
	highlight: {
		color: '#0694D3',
	},
	submitContainer: {
		flexDirection: 'row',
		gap: 12,
		minWidth: 450,
		borderWidth: 1,
		borderColor: '#566674',
		borderRadius: 20,
	},
	input: {
		flex: 1,
		backgroundColor: 'transparent',
		borderWidth: 0,
	},
	inputPlaceholder: {
		color: '#566674',
	},
	submitButton: {
		justifyContent: 'center',
		paddingVertical: 8,
		paddingHorizontal: 28,
		margin: 4,
		backgroundColor: '#566674',
	},
	validBackground: {
		backgroundColor: '#0694D3',
	},
	registeredText: {
		maxWidth: 420,
		color: '#566674',
		textAlign: 'right',
	},
});

export default EmailSubscription;
