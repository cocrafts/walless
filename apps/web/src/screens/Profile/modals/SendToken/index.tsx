import { FC, useState } from 'react';
import { Stack } from '@walless/gui';

import NavBtn from './components/NavBtn';
import TabBar from './components/TabBar';

export const SendTokenScreen: FC = () => {
	const [isTokensTab, setIsTokensTab] = useState(true);

	return (
		<Stack display="flex" alignItems="center">
			<TabBar isTokensTab={isTokensTab} setIsTokensTab={setIsTokensTab} />
			<NavBtn content="Continue" route="" />
		</Stack>
	);
};

export default SendTokenScreen;
