import { FC } from 'react';

import { ButtonProps } from './utils/types';
import { Text, TouchableOpacity } from './managed';

type Props = ButtonProps & {
	title?: string;
	titleClass?: string;
};

const defaultButtonClass = 'p-3 rounded-xl bg-blue-500';
const defaultTitleClass = 'text-white text-center';

export const Button: FC<Props> = ({
	className = defaultButtonClass,
	title = 'Button Title',
	titleClass = defaultTitleClass,
	onPress,
}) => {
	return (
		<TouchableOpacity className={className} onPress={onPress}>
			<Text className={titleClass}>{title}</Text>
		</TouchableOpacity>
	);
};

export default Button;
