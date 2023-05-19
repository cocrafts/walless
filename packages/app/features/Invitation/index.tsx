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
		height: logoSize,
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
			<View style={styles.headerContainer}>
				<Image style={logoStyle} source={logoSrc} resizeMode="cover" />
				<View>
					<Text style={styles.reminderText}>
						Invitation code is require to access
					</Text>
					<Text style={styles.reminderText}>Walless Beta</Text>
				</View>
			</View>

			<View style={styles.commandContainer}>
				<Input
					autoFocus
					style={styles.inputContainer}
					maxLength={24}
					value={input}
					onChangeText={setInput}
					onKeyPress={handleKeyPress}
					placeholder="Enter code"
					placeholderTextColor={styles.placeholder.color}
				/>
				{loading ? (
					<ActivityIndicator color="white" />
				) : (
					<Button
						style={styles.activeEnterButton}
						onPress={() => input.length > minLength && onEnter?.(input)}
					>
						<Text style={styles.activeButtonTitle}> Count me in </Text>
					</Button>
				)}
			</View>

			<View style={styles.footerContainer}>
				<View style={styles.separate}>
					<View style={styles.separateLine} />
					<Text style={styles.separateText}>If don&apos;t have code</Text>
					<View style={styles.separateLine} />
				</View>
				<Button style={styles.getCodeButton}>
					<Text style={styles.activeButtonTitle}>Get invitation code</Text>
				</Button>
				<Anchor
					titleStyle={styles.clickableText}
					title="I already have Walless account"
				/>
			</View>
		</View>
	);
};

export default InvitationFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 32,
	},
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	reminderText: {
		fontSize: 18,
		fontWeight: '400',
		textAlign: 'center',
	},
	commandContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 50,
		gap: 24,
	},
	inputContainer: {
		width: 336,
		height: 48,
	},
	placeholder: {
		color: '#566674',
	},
	activeEnterButton: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 336,
		height: 48,
		paddingVertical: 12,
	},
	disabledEnterButton: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 336,
		height: 48,
		paddingVertical: 12,
		backgroundColor: '#223240',
	},
	activeButtonTitle: {
		fontSize: 16,
		fontWeight: '500',
		color: '#ffffff',
	},
	disabledButtonTitle: {
		fontSize: 16,
		fontWeight: '500',
		color: '#566674',
	},
	separate: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	separateLine: {
		width: 88,
		height: 1,
		backgroundColor: '#2A333C',
	},
	separateText: {
		fontSize: 14,
		color: '#566674',
		fontWeight: '400',
	},
	getCodeButton: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 336,
		height: 48,
		backgroundColor: '#000000',
	},
	clickableText: {
		fontSize: 14,
		fontWeight: '400',
		color: '#0694D3',
	},
	footerContainer: {
		alignItems: 'center',
		gap: 24,
	},
	errorText: {
		fontSize: 13,
		marginTop: 12,
		color: 'red',
	},
});
