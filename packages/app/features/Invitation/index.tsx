import { type FC, useState } from 'react';
import {
	type ImageSourcePropType,
	type ImageStyle,
	type NativeSyntheticEvent,
	type TextInputKeyPressEventData,
	type ViewStyle,
	ActivityIndicator,
	Image,
	StyleSheet,
} from 'react-native';
import { Anchor, Button, Input, Text, View } from '@walless/gui';

interface Props {
	style?: ViewStyle;
	logoSrc: ImageSourcePropType;
	logoSize?: number;
	minLength?: number;
	onEnter?: (code: string) => void;
	loading?: boolean;
	error?: string;
}

export const InvitationFeature: FC<Props> = ({
	style,
	logoSrc,
	logoSize = 120,
	minLength = 3,
	onEnter,
	loading,
	error,
}) => {
	const [input, setInput] = useState('');
	const logoStyle: ImageStyle = {
		width: logoSize,
		height: logoSize * 0.8,
	};

	const handleKeyPress = ({
		nativeEvent,
	}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
		if (nativeEvent.key === 'Enter') {
			if (input.length > minLength) {
				onEnter?.(input);
			}
		}
	};

	return (
		<View style={[styles.container, style]}>
			<View style={styles.innerContainer}>
				<Image style={logoStyle} source={logoSrc} resizeMode="cover" />
				<Text>For early access, enter invitation code!</Text>
				<Input
					autoFocus
					style={styles.inputContainer}
					maxLength={24}
					value={input}
					onChangeText={setInput}
					onKeyPress={handleKeyPress}
				/>
				<View style={styles.commandContainer}>
					{loading ? (
						<ActivityIndicator color="white" />
					) : (
						<Button
							style={styles.button}
							title="Enter"
							onPress={() => input.length > minLength && onEnter?.(input)}
						/>
					)}
				</View>
				<View style={styles.errorContainer}>
					{error && <Text style={styles.errorText}>{error}</Text>}
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

export default InvitationFeature;

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
	inputContainer: {
		width: 200,
		textAlign: 'center',
		marginTop: 24,
	},
	button: {
		width: 200,
		paddingVertical: 12,
	},
	footerContainer: {
		alignItems: 'center',
		paddingBottom: 24,
	},
	errorContainer: {
		minHeight: 50,
	},
	errorText: {
		fontSize: 13,
		marginTop: 12,
		color: 'red',
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
