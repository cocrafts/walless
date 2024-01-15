import { type FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Anchor, Text, View } from '@walless/gui';
import { useSafeAreaInsets, useSnapshot } from 'hooks';
import { appState } from 'state';
import assets from 'utils/assets';
import { makeProfile, setProfile, signIn } from 'utils/auth';
import type { UserAuth } from 'utils/firebase';

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
		const user = await signIn(invitationCode);
		await setProfile(makeProfile(user as UserAuth));
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
