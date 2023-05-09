import { type FC, useState } from 'react';
// import { Networks } from '@walless/core';
// import { TokenDocument } from '@walless/store';
import { Stack, Text } from '@walless/ui';

import ScreenContainer from '../components/ScreenContainer';

import MainFeatures from './MainFeatures';
import { layoutTabs, TabAble } from './shared';
import TabsHeader from './TabsHeader';
// import TokenList from './TokenList';

const Detail: FC = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	// const tokens: TokenDocument[] = [
	// 	{
	// 		network: Networks.solana,
	// 		type: 'Token',
	// 		account: {
	// 			mint: '11111111111111111111111111111111',
	// 			owner: 'system',
	// 			address: 'BZzo1nvMfW7ScPLto6P2DzYvKsEoHwZXVkMqHa2h8zCt',
	// 			balance: '0',
	// 			decimals: 9,
	// 		},
	// 		metadata: {
	// 			name: 'Solana',
	// 			symbol: 'SOL',
	// 			imageUri: '/img/walless-icon.png',
	// 		},
	// 		_id: 'BZzo1nvMfW7ScPLto6P2DzYvKsEoHwZXVkMqHa2h8zCt/11111111111111111111111111111111',
	// 		_rev: '1-a46c432ef1d3a2b8ca4d3bb94ce892ed',
	// 	},
	// ];

	const onTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	return (
		<ScreenContainer>
			<Stack
				height={120}
				width="100%"
				backgroundColor="#0694D3"
				margin={28}
				marginTop={12}
			>
				<Text>Wallet card goes here</Text>
			</Stack>

			<MainFeatures />

			<Stack marginTop={36} marginBottom={12}>
				<TabsHeader
					items={layoutTabs}
					activeItem={layoutTabs[activeTabIndex]}
					onTabPress={onTabPress}
				/>
				{/* <TokenList items={tokens} /> */}
			</Stack>
		</ScreenContainer>
	);
};

export default Detail;
