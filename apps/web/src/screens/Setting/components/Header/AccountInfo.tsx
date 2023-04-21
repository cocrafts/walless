import { type FC } from 'react';
import { type UserProfile } from '@walless/core';
import { Image, Stack, Text } from '@walless/ui';

interface Props {
	profile: UserProfile;
}

const AccountInfo: FC<Props> = ({ profile }) => {
	const displayName = profile.name || profile.email || 'Anonymous';
	const imageSource = { uri: profile.profileImage };

	return (
		<Stack flexDirection="row" alignItems="center" gap={16}>
			<Image src={imageSource} width={50} height={50} borderRadius={10} />
			<Text fontSize={20}>{displayName}</Text>
		</Stack>
	);
};

export default AccountInfo;
