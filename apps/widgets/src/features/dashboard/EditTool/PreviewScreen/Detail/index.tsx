import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { type ScrollView as TypeScrollView, ScrollView } from 'react-native';
import { View } from '@walless/gui';
import type { MetadataDocument } from '@walless/store';
import { appState } from 'state/tool';
import { resources } from 'utils/config';
import { useSnapshot } from 'valtio';

import { DetailTool } from '../../internal';
import TargetWrapper from '../../TargetWrapper';
import ScreenContainer from '../components/ScreenContainer';

import type { CardSkin } from './WalletCard/shared';
import CollectibleList from './CollectibleList';
import { mockMetadata } from './internal';
import MainFeatures from './MainFeatures';
import type { TabAble } from './shared';
import { layoutTabs } from './shared';
import TabsHeader from './TabsHeader';
import TokenList from './TokenList';
import { WalletCard } from './WalletCard';

const Detail: FC = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const tabScrollRef = useRef<TypeScrollView>(null);
	const tabPositionRef = useRef<{ position: number[] }>({ position: [] });
	const { tools } = useSnapshot(appState);
	const { tokens, collectibles } = tools.detail;
	const tokensAddress = Object.keys(tokens);
	const mainToken = tokens[tokensAddress[0]];
	const subTokens = tokensAddress.slice(1).map((address) => tokens[address]);
	const collectiblesAddress = Object.keys(collectibles);
	const collectiblesList = collectiblesAddress.map(
		(address) => collectibles[address],
	);

	const onTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
		tabScrollRef.current?.scrollTo({
			x: tabPositionRef.current.position[idx],
		});
	};

	useEffect(() => {
		if (tools.target === DetailTool.token) {
			setActiveTabIndex(0);
			tabScrollRef.current?.scrollTo({
				x: tabPositionRef.current.position[0],
			});
		} else if (tools.target === DetailTool.collectibles) {
			setActiveTabIndex(1);
			tabScrollRef.current?.scrollTo({
				x: tabPositionRef.current.position[1],
			});
		}
	}, [tools.target]);

	return (
		<ScreenContainer>
			<View>
				<ScrollView horizontal>
					<WalletCard
						skin={tezosCardSkin}
						token={(mainToken as MetadataDocument) || mockMetadata}
					/>
				</ScrollView>

				<View>
					<MainFeatures />
				</View>

				<View>
					<View>
						<TabsHeader
							items={layoutTabs}
							activeItem={layoutTabs[activeTabIndex]}
							onTabPress={onTabPress}
						/>
					</View>
					<View>
						<TargetWrapper isTargeted={tools.target === DetailTool.token}>
							<View
								onLayout={({ nativeEvent }) =>
									tabPositionRef.current?.position.push(nativeEvent.layout.x)
								}
							>
								<TokenList items={subTokens as MetadataDocument[]} />
							</View>
						</TargetWrapper>
						<TargetWrapper
							isTargeted={tools.target === DetailTool.collectibles}
						>
							<View
								onLayout={({ nativeEvent }) =>
									tabPositionRef.current?.position.push(nativeEvent.layout.x)
								}
							>
								<CollectibleList
									items={collectiblesList as MetadataDocument[]}
								/>
							</View>
						</TargetWrapper>
						<View />
					</View>
				</View>
			</View>
		</ScreenContainer>
	);
};

export default Detail;

const tezosCardSkin: CardSkin = {
	backgroundSrc: resources.tool.detail.backgroundSrc,
	largeIconSrc: resources.tool.detail.largeIconSrc,
	iconSrc: resources.tool.detail.iconSrc,
	iconColor: '#000000',
	iconSize: 22,
};
