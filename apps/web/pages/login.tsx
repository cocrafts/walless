import React from 'react';
import { Button, Stack, Text } from '@walless/wui';
import { useRouter } from 'next/router';

export const Login: React.FC = () => {
	const router = useRouter();

	return (
		<Stack flex={1} alignItems="center" justifyContent="center">
			<Stack
				maxWidth={410}
				maxHeight={600}
				alignItems="center"
				justifyContent="center"
			>
				<Text>Login</Text>
				<Button onPress={() => router.push('/initialize-passcode')}>
					Press to login
				</Button>
			</Stack>
		</Stack>
	);
};

export default Login;
