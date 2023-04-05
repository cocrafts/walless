import { FC, ReactNode } from 'react';
import { Stack, Text } from '@walless/gui';

interface Props {
	children: ReactNode;
	featureName: string;
	onPress: () => void;
}

const FeatureButton: FC<Props> = ({ children, featureName, onPress }) => {
	return (
		<Stack display="flex" alignItems="center" gap={6}>
			<Stack
				width={50}
				height={50}
				backgroundColor="#0694D3"
				borderRadius={16}
				display="flex"
				justifyContent="center"
				alignItems="center"
				onPress={onPress}
			>
				{children}
			</Stack>
			<Text textAlign="center" color="#566674">
				{featureName}
			</Text>
		</Stack>
	);
};

export default FeatureButton;
