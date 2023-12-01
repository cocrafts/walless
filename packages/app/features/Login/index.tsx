import type { FC } from 'react';
import { useEffect } from 'react';
import type { ImageSourcePropType, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Anchor, BindDirections, modalActions, Text, View } from '@walless/gui';

import ErrorAnnouncement from '../../components/ErrorAnnouncement';

import SignInHeader from './SignInHeader';
import SignInInner from './SignInInner';

interface Props {
	style?: ViewStyle;
	logoSrc: ImageSourcePropType;
	logoSize?: number;
	onGoogleSignIn?: () => void;
	loading?: boolean;
	isAbleToSignIn?: boolean;
	onGetInvitationCode?: () => void;
	version?: string;
	error?: string;
}

export const LoginFeature: FC<Props> = ({
	style,
	logoSrc,
	logoSize = 120,
	onGoogleSignIn,
	loading,
	isAbleToSignIn = true,
	onGetInvitationCode,
	version = '1.0.2',
	error,
}) => {
	useEffect(() => {
		if (!isAbleToSignIn && error) {
			modalActions.show({
				id: 'error-announcement',
				component: () => <ErrorAnnouncement content={error} />,
				maskActiveOpacity: 0,
				bindingDirection: BindDirections.Top,
			});
		}
	}, [error]);

	return (
		<View style={[styles.container, style]}>
			<SignInHeader logoSrc={logoSrc} logoSize={logoSize} />
			<SignInInner
				isAbleToSignIn={isAbleToSignIn}
				onGoogleSignIn={onGoogleSignIn}
				loading={loading}
				onGetInvitationCode={onGetInvitationCode}
			/>
			<View style={styles.footerContainer}>
				<View style={styles.helpContainer}>
					<Text>Having issues with log in? Visit </Text>
					<Anchor href="https://walless.io/faq/login" title="Help page" />
				</View>
				<Text style={styles.poweredText}>
					Powered by walless.io, version@{version}
				</Text>
			</View>
		</View>
	);
};

export default LoginFeature;

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
