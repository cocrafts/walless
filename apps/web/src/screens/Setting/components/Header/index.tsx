import { Stack } from '@walless/ui';

import AccountInfo from './AccountInfo';
import Title from './Title';

const Header = () => {
	return (
		<Stack gap={20}>
			<Title />
			<AccountInfo />
		</Stack>
	);
};

export default Header;
