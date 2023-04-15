import { FC, ReactNode } from 'react';
import { Button, Stack, Text } from '@walless/gui';

interface Props {
	children: ReactNode;
	featureName: string;
	onPress: () => void;
}

const FeatureButton: FC<Props> = ({ children, featureName, onPress }) => {
	return (
		<Stack display="flex" alignItems="center" gap={6}>
			<Button
				width={50}
				height={50}
				padding={0}
				backgroundColor="#0694D3"
				borderRadius={16}
				justifyContent="center"
				alignItems="center"
				onPress={onPress}
			>
				{children}
			</Button>
			<Text textAlign="center" color="#566674">
				{featureName}
			</Text>
		</Stack>
	);
};

export default FeatureButton;
