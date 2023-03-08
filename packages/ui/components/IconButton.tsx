import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';

import { Image, TouchableOpacity } from '../managed';
import { ButtonProps } from '../utils/types';

type Props = ButtonProps & {
	source: ImageSourcePropType;
	size?: number;
};

export const IconButton: FC<Props> = ({
	className,
	source,
	size = 36,
	onPress,
}) => {
	const iconStyle = {
		width: size,
		height: size,
	};

	return (
		<TouchableOpacity className={className} onPress={onPress}>
			<Image source={source} style={iconStyle} />
		</TouchableOpacity>
	);
};

export default IconButton;
