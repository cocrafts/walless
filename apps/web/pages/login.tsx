import React from 'react';
import { Button, ExtensionContainer, Text } from '@walless/wui';
import { useRouter } from 'next/router';

export const Login: React.FC = () => {
	const router = useRouter();

	return (
		<ExtensionContainer justifyContent="center">
			<Text>Login</Text>
			<Button onPress={() => router.push('/initialize-passcode')}>
				Press to login
			</Button>
		</ExtensionContainer>
	);
};

export default Login;
