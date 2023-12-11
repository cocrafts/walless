import type { FC } from 'react';
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView } from 'react-native';
import {
	InvitationFeature,
	useSafeAreaInsets,
	useSnapshot,
} from '@walless/app';
import { validateInvitationCode } from '@walless/auth';
import { appState } from '@walless/engine';
import { dimensionState } from '@walless/gui';
import { navigate } from 'utils/navigation';

export const InvitationScreen: FC = () => {
	const [invitationError, setInvitationError] = useState<string>();
	const logoSrc = require('assets/img/icon.png');
	const { windowSize } = useSnapshot(dimensionState);
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		paddingTop: insets.top,
		paddingBottom: Math.max(insets.bottom, 24),
		paddingHorizontal: 38,
	};
	const scrollContentContainerStyle: ViewStyle = {
		minHeight: windowSize.height,
	};

	const onInvitationCodeChange = async (value: string) => {
		if (invitationError && value.length > 0) {
			setInvitationError(undefined);
		}

		try {
			const code = await validateInvitationCode(value);
			appState.invitationCode = code;
			navigate('Authentication', { screen: 'Login' });
		} catch (err) {
			setInvitationError((err as Error).message);
		}
	};

	const handleLoginPress = () => {
		setInvitationError(undefined);
		navigate('Authentication', { screen: 'Login' });
	};

	return (
		<ScrollView contentContainerStyle={scrollContentContainerStyle}>
			<InvitationFeature
				style={containerStyle}
				onEnter={onInvitationCodeChange}
				logoSrc={logoSrc}
				error={invitationError}
				onLoginPress={handleLoginPress}
			/>
		</ScrollView>
	);
};

export default InvitationScreen;
