import { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	AGGREGATE_VERIFIER,
	TorusAggregateLoginResponse,
} from '@toruslabs/customauth';
import { useW3a } from 'utils/hook';
import { customAuth } from 'utils/w3a';

export const LoginScreen: FC = () => {
	const [login, setLogin] = useState<TorusAggregateLoginResponse>();
	useW3a();

	const toggleLogin = async () => {
		const loginResponse = await customAuth.triggerAggregateLogin({
			aggregateVerifierType: AGGREGATE_VERIFIER.SINGLE_VERIFIER_ID,
			verifierIdentifier: 'stormgate-testnet',
			subVerifierDetailsArray: [
				{
					typeOfLogin: 'google',
					verifier: 'google',
					clientId: GOOGLE_CLIENT_ID,
				},
			],
		});

		setLogin(loginResponse);
		console.log(loginResponse, '<--');
	};

	return (
		<View style={styles.container}>
			<Text onPress={toggleLogin} style={styles.heading}>
				Google Sign-In
			</Text>
			<Text>
				<Text style={styles.sub}>Created with ❤️ by Metacraft</Text>
			</Text>
			{login?.pubKey && (
				<Text style={{ color: '#ADADAD', marginTop: 24 }}>
					{login?.userInfo[0]?.email} {login?.publicAddress}
				</Text>
			)}
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#001825',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heading: {
		color: '#ffffff',
		fontSize: 42,
		marginBottom: 8,
	},
	sub: {
		color: '#888888',
	},
});
