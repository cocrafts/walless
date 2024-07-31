import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Anchor, Text, View } from '@walless/gui';
import { appState } from 'state/app';
import { useSafeAreaInsets, useSnapshot } from 'utils/hooks';

import { signIn } from './internal';
import SignInHeader from './SignInHeader';
import SignInInner from './SignInInner';

export const LoginScreen: FC = () => {
	const [loading, setLoading] = useState(false);
	const insets = useSafeAreaInsets();
	const { invitationCode, config } = useSnapshot(appState);
	const containerStyle = {
		paddingTop: insets.top,
		paddingBottom: Math.max(insets.bottom, 24),
	};
	const logoSize = 120;

	const handleGoogleSignIn = async () => {
		setLoading(true);
		await signIn(invitationCode);
		setLoading(false);
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View />
			<SignInHeader logoSize={logoSize} />
			<SignInInner onGoogleSignIn={handleGoogleSignIn} loading={loading} />
			<View style={styles.footerContainer}>
				<View style={styles.helpContainer}>
					<Text>Having issues with log in? Visit </Text>
					<Anchor href="https://walless.io/faq/login" title="Help page" />
				</View>
				<Text style={styles.poweredText}>
					Powered by walless.io, version@{config.version}
				</Text>
			</View>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	footerContainer: {
		alignItems: 'center',
	},
	helpContainer: {
		flexDirection: 'row',
	},
	poweredText: {
		fontSize: 12,
		color: '#5D6A73',
		textAlign: 'center',
		marginTop: 6,
	},
});
