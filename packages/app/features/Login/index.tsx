import { type FC, useEffect } from 'react';
import {
	type ImageSourcePropType,
	type ViewStyle,
	StyleSheet,
} from 'react-native';
import { ErrorAnnouncement } from '@walless/app';
import { Anchor, BindDirections, modalActions, Text, View } from '@walless/gui';

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
				<Text style={styles.footerText}>
					<Text>Having issues with log in? Visit </Text>
					<Anchor href="https://walless.io/faq/login" title="Help page" />
				</Text>
				<Text style={styles.poweredText}>Powered by walless.io</Text>
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
	footerText: {
		fontSize: 12,
	},
	poweredText: {
		fontSize: 12,
		color: '#5D6A73',
		marginTop: 6,
	},
});
