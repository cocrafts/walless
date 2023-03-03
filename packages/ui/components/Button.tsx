import { FC } from 'react';

import { Text, TouchableOpacity } from '../managed';
import { ButtonProps } from '../utils/types';

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
	disabled,
	onPress,
}) => {
	return (
		<TouchableOpacity
			className={className}
			onPress={onPress}
			disabled={disabled}
		>
			<Text className={titleClass}>{title}</Text>
		</TouchableOpacity>
	);
};

export default Button;
