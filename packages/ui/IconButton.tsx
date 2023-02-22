import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';

import { Image, TouchableOpacity } from './managed';

interface Props {
	className?: string;
	source: ImageSourcePropType;
	size?: number;
	onPress?: () => void;
}

export const IconButton: FC<Props> = ({
	className,
	source,
	size = 40,
	onPress,
}) => {
	const containerStyle = { backgroundColor: '#093958' };
	const iconStyle = { width: size, height: size };

	return (
		<TouchableOpacity
			style={containerStyle}
			className={className}
			onPress={onPress}
		>
			<Image source={source} style={iconStyle} />
		</TouchableOpacity>
	);
};

export default IconButton;
