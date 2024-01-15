import type { FC } from 'react';
import type { ImageStyle } from 'react-native';
import { Image } from 'react-native';
import type { IconProps } from '@walless/icons';
import { useSnapshot } from 'hooks';
import { appState } from 'state';

export const ProfileIcon: FC<IconProps> = ({ size = 20 }) => {
	const { profile } = useSnapshot(appState);
	const imageSource = { uri: profile?.profileImage };
	const style: ImageStyle = {
		width: size,
		height: size,
		borderRadius: size / 2,
	};

	return <Image style={style} source={imageSource} />;
};

export default ProfileIcon;
