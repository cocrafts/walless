import { FC, ReactNode } from 'react';
import { Stack, Text } from '@walless/gui';

interface Props {
	children: ReactNode;
	featureName: string;
	onClick: () => void;
}

const FeatureButton: FC<Props> = ({ children, featureName, onClick }) => {
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
				onPress={onClick}
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
