import { type FC, useEffect, useState } from 'react';
import {
	type ImageSourcePropType,
	type NativeSyntheticEvent,
	type TextInputKeyPressEventData,
	type ViewStyle,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';
import {
	BindDirections,
	Button,
	Input,
	modalActions,
	Text,
	View,
} from '@walless/gui';

import GetCode from './components/GetCode';
import InvitationError from './components/InvitationError';
import InvitationHeader from './components/InvitationHeader';

interface Props {
	style?: ViewStyle;
	logoSrc: ImageSourcePropType;
	logoSize?: number;
	minLength?: number;
	loading?: boolean;
	error?: string;
	onEnter?: (code: string) => void;
	onNavigateToLogIn?: () => void;
}

export const InvitationFeature: FC<Props> = ({
	style,
	logoSrc,
	logoSize = 120,
	minLength = 3,
	onEnter,
	onNavigateToLogIn,
	loading,
	error,
}) => {
	const [input, setInput] = useState('');

	const handleKeyPress = ({
		nativeEvent,
	}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
		if (nativeEvent.key === 'Enter') {
			if (input.length > minLength) {
				onEnter?.(input);
				console.log(input);
			}
		}
	};

	useEffect(() => {
		if (error) {
			modalActions.show({
				id: 'invitation-error',
				component: () => <InvitationError content={error} />,
				maskActiveOpacity: 0,
				bindingDirection: BindDirections.Top,
			});
		}
	}, [error]);

	return (
		<View style={[styles.container, style]}>
			<InvitationHeader logoSrc={logoSrc} logoSize={logoSize} />

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
						disabled={input.length <= minLength}
						style={
							input.length >= minLength
								? styles.activeEnterButton
								: styles.disabledEnterButton
						}
						onPress={() => {
							if (input.length >= minLength) onEnter?.(input);
						}}
					>
						<Text style={styles.activeButtonTitle}> Count me in </Text>
					</Button>
				)}
			</View>

			<View style={styles.footerContainer}>
				<GetCode />
				<Button
					titleStyle={styles.clickableText}
					title="I already have Walless account"
					style={styles.transparentButton}
					onPress={onNavigateToLogIn}
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

	clickableText: {
		fontSize: 14,
		fontWeight: '400',
		color: '#0694D3',
		textAlign: 'center',
	},
	transparentButton: {
		padding: 0,
		backgroundColor: 'transparent',
	},
	footerContainer: {
		alignItems: 'center',
		gap: 16,
	},
	errorText: {
		fontSize: 13,
		marginTop: 12,
		color: 'red',
	},
});
