import type { FC, ReactNode } from 'react';
import { Button, Text, View } from '@walless/gui';

interface Props {
	children: ReactNode;
	title: string;
	size?: number;
}

const FeatureButton: FC<Props> = ({ children, size = 38, title }) => {
	return (
		<View>
			<Button>{children}</Button>
			<Text>{title}</Text>
		</View>
	);
};

export default FeatureButton;
