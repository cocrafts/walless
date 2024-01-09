import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { appState } from '@walless/engine';
import { Anchor, Text, View } from '@walless/gui';
import { appActions } from 'state/app';
import { asset } from 'utils/config';
import { useSafeAreaInsets, useSnapshot } from 'utils/hooks';

import SignInHeader from './SignInHeader';
import SignInInner from './SignInInner';

export const LoginScreen: FC = () => {
	const insets = useSafeAreaInsets();
	const { authenticationLoading, invitationCode, config } =
		useSnapshot(appState);
	const containerStyle = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};

	const logoSize = 120;

	return (
		<View style={[styles.container, containerStyle]}>
			<View />
			<SignInHeader logoSrc={asset.misc.walless} logoSize={logoSize} />
			<SignInInner
				onGoogleSignIn={() => appActions.signInWithGoogle(invitationCode)}
				loading={authenticationLoading}
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
