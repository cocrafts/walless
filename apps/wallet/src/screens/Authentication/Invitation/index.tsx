import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
} from 'react-native';
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	type ViewStyle,
} from 'react-native';
import { Anchor, Button, Input, Text, View } from '@walless/gui';
import { showError } from 'modals/Error';
import { appState } from 'state/app';
import { validateInvitationCode } from 'utils/auth';
import { useSafeAreaInsets, useSnapshot } from 'utils/hooks';
import { navigate } from 'utils/navigation';
import { hideNativeKeyboard } from 'utils/system';

import HadWalletAccount from './GetCode';
import InvitationHeader from './InvitationHeader';

export const InvitationScreen: FC = () => {
	const [error, setError] = useState<string>();
	const [input, setInput] = useState<string>('');
	const { config } = useSnapshot(appState);

	const logoSize = 120;
	const minLength = 3;

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
				handleChangeInvitationCode(input);
			}
		}
	};

	const insets = useSafeAreaInsets();

	const containerStyle: ViewStyle = {
		paddingTop: insets.top,
		paddingBottom: Math.max(insets.bottom, 24),
		paddingHorizontal: 38,
	};

	const handleChangeInvitationCode = async (value: string) => {
		if (error && value.length > 0) {
			setError(undefined);
		}

		try {
			const code = await validateInvitationCode(value);
			appState.invitationCode = code;
			navigate('Authentication', { screen: 'Login' });
		} catch (err) {
			setError((err as Error).message);
		}
	};

	const handleLoginPress = () => {
		setError(undefined);
		navigate('Authentication', { screen: 'Login' });
	};

	useEffect(() => {
		if (error) {
			showError({ errorText: error });
		}
	}, [error]);

	return (
		<TouchableWithoutFeedback onPress={hideNativeKeyboard}>
			<View style={[styles.container, containerStyle]}>
				<View />

				<KeyboardAvoidingView style={styles.upperContainer} behavior="padding">
					<InvitationHeader logoSize={logoSize} style={styles.logoContainer} />
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

					<Button
						disabled={isLengthInvalid}
						style={styles.enterButton}
						onPress={() =>
							!isLengthInvalid && handleChangeInvitationCode(input)
						}
					>
						<Text style={buttonTitleStyle}>Count me in</Text>
					</Button>
					<View style={styles.separateLine} />
					<HadWalletAccount onLoginPress={handleLoginPress} />
				</KeyboardAvoidingView>

				<View>
					<Anchor
						titleStyle={styles.getInvitationText}
						title="Get invitation code"
						href="https://twitter.com/walless_wallet/status/1694255782651658737"
					/>
					<Text style={styles.poweredText}>
						Powered by walless.io, version@{config.version}
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default InvitationScreen;

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
	poweredText: {
		fontSize: 12,
		color: '#5D6A73',
		marginTop: 6,
		textAlign: 'center',
	},
});
