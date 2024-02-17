import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Anchor, Text, View } from '@walless/gui';
import { appState } from 'state/app';
import assets from 'utils/assets';
import { useSafeAreaInsets, useSnapshot } from 'utils/hooks';

import { signIn, SignInMethod } from './internal';
import SignInHeader from './SignInHeader';
import SignInInner from './SignInInner';

export const LoginScreen: FC = () => {
	const [loading, setLoading] = useState(false);
	const insets = useSafeAreaInsets();
	const { invitationCode, config } = useSnapshot(appState);
	const containerStyle = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};
	const logoSize = 120;

	const handleSignIn = async (method: SignInMethod) => {
		setLoading(true);
		await signIn(invitationCode, method);
		setLoading(false);
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View />

			<SignInHeader logoSrc={assets.misc.walless} logoSize={logoSize} />

			<SignInInner
				onGoogleSignIn={() => handleSignIn(SignInMethod.Google)}
				onAppleSignIn={() => handleSignIn(SignInMethod.Apple)}
				loading={loading}
			/>

			<View style={styles.footerContainer}>
				<View style={styles.helpContainer}>
					<Text>Having issues with log in? Visit </Text>
					<Anchor href="https://walless.io/faq/login" title="Help page" />
				</View>
				<Text style={styles.poweredText}>
					Powered by walless.io, version@{config?.version}
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
		paddingBottom: 24,
	},
	helpContainer: {
		flexDirection: 'row',
	},
	poweredText: {
		fontSize: 12,
		color: '#5D6A73',
		marginTop: 6,
	},
});
