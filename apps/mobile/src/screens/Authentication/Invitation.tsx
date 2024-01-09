import type { FC } from 'react';
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import { validateInvitationCode } from '@walless/auth';
import { appState } from '@walless/engine';
import InvitationFeature from 'features/Invitation';
import { asset } from 'utils/config';
import { useSafeAreaInsets } from 'utils/hooks';
import { navigate } from 'utils/navigation';

export const InvitationScreen: FC = () => {
	const [invitationError, setInvitationError] = useState<string>();
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		paddingTop: insets.top,
		paddingBottom: Math.max(insets.bottom, 32),
		paddingHorizontal: 38,
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
		<InvitationFeature
			style={containerStyle}
			onEnter={onInvitationCodeChange}
			logoSrc={asset.misc.walless}
			error={invitationError}
			onLoginPress={handleLoginPress}
		/>
	);
};

export default InvitationScreen;
