import { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Anchor, Button, Image, Stack, Text } from '@walless/gui';

interface Props {
	logoSrc: ImageSourcePropType;
	logoSize?: number;
	onGoogleSignIn?: () => void;
}

export const LoginFeature: FC<Props> = ({
	logoSrc,
	logoSize = 120,
	onGoogleSignIn,
}) => {
	return (
		<Stack flex={1}>
			<Stack flex={1} alignItems="center" justifyContent="center">
				<Image
					src={logoSrc}
					width={logoSize}
					height={logoSize * 0.8}
					resizeMode="cover"
				/>
				<Text>Sign in to continue</Text>
				<Button
					marginTop={54}
					title="Sign in with Google"
					onPress={onGoogleSignIn}
				/>
			</Stack>
			<Stack alignItems="center" paddingBottom={24}>
				<Text fontSize={12}>
					<Text>Having issues with log in? Visit</Text>
					<Anchor href="https://walless.io/faq/login"> Help page</Anchor>
				</Text>
				<Text fontSize={12} color="#5D6A73" marginTop={6}>
					Powered by walless.io
				</Text>
			</Stack>
		</Stack>
	);
};

export default LoginFeature;
