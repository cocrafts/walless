import React from 'react';
import { Button, Stack, Text } from '@walless/wui';
import { useRouter } from 'next/router';
// import { appActions } from 'utils/state/app';

export const Login: React.FC = () => {
	const router = useRouter();

	const onLogin = () => {
		router.push('/passcode/initialize');
		// appActions.signInGoogle();
	};

	return (
		<Stack flex={1} alignItems="center" justifyContent="center">
			<Stack
				maxWidth={410}
				maxHeight={600}
				alignItems="center"
				justifyContent="center"
			>
				<Text>Login</Text>
				<Button onPress={onLogin}>Press to login</Button>
			</Stack>
		</Stack>
	);
};

export default Login;
