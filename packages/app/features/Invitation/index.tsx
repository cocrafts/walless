import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type {
	ImageSourcePropType,
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
	ViewStyle,
} from 'react-native';
import {
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
} from 'react-native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import {
	Anchor,
	BindDirections,
	Button,
	Input,
	modalActions,
	Text,
	View,
} from '@walless/gui';

import ErrorAnnouncement from '../../components/ErrorAnnouncement';
import { hideNativeKeyboard } from '../../utils';

import HadWalletAccount from './components/GetCode';
import InvitationHeader from './components/InvitationHeader';

interface Props {
	style?: ViewStyle;
	logoSrc: ImageSourcePropType;
	logoSize?: number;
	minLength?: number;
	loading?: boolean;
	error?: string;
	onEnter?: (code: string) => void;
	onLoginPress?: () => void;
}

export const InvitationFeature: FC<Props> = ({
	style,
	logoSrc,
	logoSize = 120,
	minLength = 3,
	onEnter,
	onLoginPress,
	loading,
	error,
}) => {
	const [input, setInput] = useState('');
	const isLengthInvalid = input?.length < minLength;
	const buttonTitleStyle = [
		styles.buttonTitle,
		isLengthInvalid && styles.disabledTitle,
	];

	const handleKeyPress = ({
		nativeEvent,
	}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
		if (nativeEvent.key === 'Enter') {
			if (input.length > minLength) {
				onEnter?.(input);
			}
		}
	};

	useEffect(() => {
		if (error) {
			modalActions.show({
				id: 'error-announcement',
				component: () => <ErrorAnnouncement content={error} />,
				maskActiveOpacity: 0,
				bindingDirection: BindDirections.Top,
			});
		}
	}, [error]);

	return (
		<TouchableWithoutFeedback onPress={hideNativeKeyboard}>
			<View style={[styles.container, style]}>
				<View />

				<KeyboardAvoidingView style={styles.upperContainer} behavior="padding">
					<InvitationHeader
						logoSrc={logoSrc}
						logoSize={logoSize}
						style={styles.logoContainer}
					/>
					<Input
						autoFocus={autoFocus}
						inputStyle={styles.codeInput}
						maxLength={24}
						value={input}
						onChangeText={setInput}
						onKeyPress={handleKeyPress}
						placeholder="enter Invitation code"
						placeholderTextColor={styles.placeholder.color}
					/>
					{loading ? (
						<ActivityIndicator color="white" />
					) : (
						<Button
							disabled={isLengthInvalid}
							style={styles.enterButton}
							onPress={() => !isLengthInvalid && onEnter?.(input)}
						>
							<Text style={buttonTitleStyle}>Count me in</Text>
						</Button>
					)}
					<View style={styles.separateLine} />
					<HadWalletAccount onLoginPress={onLoginPress} />
				</KeyboardAvoidingView>

				<Anchor
					titleStyle={styles.getInvitationText}
					title="Get invitation code"
					href="https://docs.google.com/forms/d/e/1FAIpQLSeMOQGfeYhq4i-V595JRc28VlY1YDpFeU0rPJkTymFH6nV21g/viewform"
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default InvitationFeature;

const autoFocus = Platform.select({
	web: true,
	default: false,
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 38,
		justifyContent: 'space-between',
		gap: 32,
	},
	upperContainer: {
		gap: 18,
	},
	logoContainer: {
		marginBottom: 24,
	},
	codeInput: {
		height: 52,
		paddingVertical: 0,
		color: '#FFFFFF',
		textAlign: 'center',
	},
	placeholder: {
		color: '#566674',
	},
	enterButton: {
		paddingVertical: 15,
	},
	disabledEnterButton: {
		backgroundColor: '#223240',
	},
	buttonTitle: {
		fontWeight: '500',
		color: '#ffffff',
	},
	disabledTitle: {
		color: '#566674',
	},
	separateLine: {
		height: 1,
		backgroundColor: '#2A333C',
	},
	getInvitationText: {
		color: '#566674',
		fontSize: 13,
		fontWeight: '400',
		textAlign: 'center',
	},
});
