import { type FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { logger } from '@walless/core';
import { Anchor, Text, View } from '@walless/gui';
import { useSafeAreaInsets, useSnapshot } from 'hooks';
import { showError } from 'modals/Error';
import { appState } from 'state';
import assets from 'utils/assets';
import {
	checkInvitationCode,
	makeProfile,
	setProfile,
	signInWithGoogle,
	signInWithTorusKey,
	ThresholdResult,
} from 'utils/auth';
import type { UserAuth } from 'utils/firebase';
import { navigate } from 'utils/navigation';

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

	const handleGoogleSignIn = async () => {
		setLoading(true);
		let user: UserAuth;
		try {
			user = await signInWithGoogle();
		} catch (error) {
			showError({ errorText: 'Something went wrong' });
			logger.error('Error when sign-in with google', error);
			return;
		}

		try {
			checkInvitationCode(user, invitationCode);
		} catch (error) {
			showError({ errorText: (error as Error).message });
			logger.error('Error when sign-in with google', error);
			navigate('Authentication', { screen: 'Invitation' });
			return;
		}
		checkInvitationCode(user, invitationCode);

		try {
			const status = await signInWithTorusKey(user);
			if (status === ThresholdResult.Initializing) {
				navigate('Authentication', { screen: 'CreatePasscode' });
			} else if (status === ThresholdResult.Missing) {
				navigate('Authentication', { screen: 'Recovery' });
			} else if (status === ThresholdResult.Ready) {
				navigate('Dashboard');
			}
		} catch (error) {
			showError({ errorText: 'Something went wrong' });
			logger.error('Error when sign-in with w3a', error);
			return;
		}

		await setProfile(makeProfile(user));
		setLoading(false);
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View />
			<SignInHeader logoSrc={assets.misc.walless} logoSize={logoSize} />
			<SignInInner onGoogleSignIn={handleGoogleSignIn} loading={loading} />
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
