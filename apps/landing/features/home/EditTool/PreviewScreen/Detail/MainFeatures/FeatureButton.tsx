import { type FC, type ReactNode } from 'react';
import { Button, Stack, Text } from '@walless/ui';

interface Props {
	children: ReactNode;
	title: string;
	size?: number;
}

const FeatureButton: FC<Props> = ({ children, size = 38, title }) => {
	return (
		<Stack alignItems="center">
			<Button
				width={size}
				height={size}
				backgroundColor="#0694E3"
				borderRadius={12}
				padding={0}
				alignItems="center"
				justifyContent="center"
			>
				{children}
			</Button>
			<Text color="#4e5e6b" fontSize={13} fontWeight="400" marginTop={8}>
				{title}
			</Text>
		</Stack>
	);
};

export default FeatureButton;
