import { FC, useState } from 'react';
import { Stack } from '@walless/gui';

import CollectiblesTab from './components/CollectiblesTab';
import NavBtn from './components/NavBtn';
import TabBar from './components/TabBar';
import TokensTab from './components/TokensTab';

export const SendTokenScreen: FC = () => {
	const [isTokensTab, setIsTokensTab] = useState(true);

	return (
		<Stack display="flex" alignItems="center">
			<TabBar isTokensTab={isTokensTab} setIsTokensTab={setIsTokensTab} />
			{isTokensTab ? <TokensTab /> : <CollectiblesTab />}
			<NavBtn content="Continue" route="" />
		</Stack>
	);
};

export default SendTokenScreen;
