import { type FC } from 'react';
import { type UserProfile } from '@walless/core';
import { Stack } from '@walless/ui';

import AccountInfo from './AccountInfo';
import Title from './Title';

interface Props {
	profile: UserProfile;
}

export const Header: FC<Props> = ({ profile }) => {
	return (
		<Stack gap={20}>
			<Title />
			<AccountInfo profile={profile} />
		</Stack>
	);
};

export default Header;
