import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from '@walless/ui';

import Indicator from '../components/Indicator';

import { wallets } from './internal';
import TabSelect from './TabSelect';
import TokensTab from './TokensTab';
import WalletCard from './WalletCard';

export const Solana: React.FC = () => {
	const tabIds = ['Tokens', 'Collectibles', 'Swap'];
	const [activeIndex, setActiveIndex] = useState(0);
	const walletScrollRef = useRef<ScrollView>(null);
	const tabScrollRef = useRef<ScrollView>(null);
	const valueX = 360;

	const onScrollPress = (index: number) => {
		walletScrollRef.current?.scrollTo({ x: index * valueX });
		setActiveIndex(index);
	};

	const handleChangeTab = (id: string) => {
		const index = tabIds.indexOf(id);
		tabScrollRef.current?.scrollTo({ x: index * valueX });
	};

	return (
		<View className="flex-1 bg-gradient-to-b from-[color:#003356] to-[color:#011726] pt-4">
			<View>
				<ScrollView
					horizontal
					ref={walletScrollRef}
					scrollEnabled={false}
					style={{ flexDirection: 'row' }}
				>
					{wallets.map((wallet) => (
						<WalletCard key={wallet.address} />
					))}
				</ScrollView>
			</View>
			<View className="flex-row justify-center mt-2">
				{wallets.map((wallet, index) => {
					const isActive = index === activeIndex;

					return (
						<Indicator
							key={index}
							isActive={isActive}
							index={index}
							onScrollPress={onScrollPress}
						/>
					);
				})}
			</View>
			<TabSelect tabIds={tabIds} handleChangeTab={handleChangeTab} />
			<ScrollView
				horizontal
				ref={tabScrollRef}
				scrollEnabled={false}
				style={{ flexDirection: 'row' }}
			>
				<TokensTab />
				<View className="w-[360px] px-4 mt-4">
					<Text>Not available yet</Text>
				</View>
				<View className="w-[360px] px-4 mt-4">
					<Text>Not available yet</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default Solana;
