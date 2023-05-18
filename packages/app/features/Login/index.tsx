import { type FC } from 'react';
import {
	type ImageSourcePropType,
	type ImageStyle,
	type ViewStyle,
	ActivityIndicator,
	Image,
	StyleSheet,
} from 'react-native';
import { Anchor, Button, Text, View } from '@walless/gui';
import { Google } from '@walless/icons';

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
			<View style={styles.headerContainer}>
				<Image style={logoStyle} source={logoSrc} resizeMode="cover" />
				<Text style={styles.title}>Sign in to continue</Text>
			</View>
			<View style={styles.innerContainer}>
				<View style={styles.commandContainer}>
					{loading ? (
						<ActivityIndicator color="white" />
					) : (
						<Button style={styles.signInButton} onPress={onGoogleSignIn}>
							<Google />{' '}
							<Text style={styles.buttonText}>Sign in with Google</Text>
						</Button>
					)}
				</View>
				<Text style={styles.subText}>Advanced mode</Text>
				<Button
					style={styles.seedPhraseButton}
					disabled
					title="Create or Import"
					titleStyle={styles.buttonText}
				/>
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
		justifyContent: 'space-between',
	},
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 48,
	},
	title: {
		fontSize: 20,
		fontWeight: '400',
	},
	innerContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 18,
		paddingBottom: 48,
	},
	commandContainer: {
		justifyContent: 'center',
	},
	signInButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0694D3',
		gap: 8,
		width: 342,
		height: 48,
		borderRadius: 16,
	},
	seedPhraseButton: {
		backgroundColor: '#243F56',
		width: 342,
		height: 48,
		borderRadius: 16,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		color: 'white',
	},
	subText: {
		fontSize: 14,
		color: '#566674',
		fontWeight: '400',
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
