import { FC, ReactNode } from 'react';
import { TextStyle } from 'react-native';
import { Text } from '@walless/ui';

interface Props extends TextStyle {
	children: ReactNode;
}

export const LightText: FC<Props> = ({ children, ...props }) => {
	return (
		<Text {...props} fontWeight={'300'} color="#566674">
			{children}
		</Text>
	);
};

export default LightText;
