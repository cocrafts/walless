import { FC } from 'react';
import {
	type ImageSourcePropType,
	type ImageStyle,
	type ViewStyle,
	ActivityIndicator,
	Image,
	StyleSheet,
} from 'react-native';
import { Anchor, Button, Text, View } from '@walless/gui';

interface Props {
	style?: ViewStyle;
	logoSrc: ImageSourcePropType;
	logoSize?: number;
	onGoogleSignIn?: () => void;
	loading?: boolean;
}

export const LoginFeature: FC<Props> = ({
	style,
	logoSrc,
	logoSize = 120,
	onGoogleSignIn,
	loading,
}) => {
	const logoStyle: ImageStyle = {
		width: logoSize,
		height: logoSize * 0.8,
	};

	return (
		<View style={[styles.container, style]}>
			<View style={styles.innerContainer}>
				<Image style={logoStyle} source={logoSrc} resizeMode="cover" />
				<Text>Sign in to continue</Text>
				<View style={styles.commandContainer}>
					{loading ? (
						<ActivityIndicator color="white" />
					) : (
						<Button title="Sign in with Google" onPress={onGoogleSignIn} />
					)}
				</View>
			</View>
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
	},
	innerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	commandContainer: {
		minHeight: 50,
		marginTop: 15,
		justifyContent: 'center',
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
