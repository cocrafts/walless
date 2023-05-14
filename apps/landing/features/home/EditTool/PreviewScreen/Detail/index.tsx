import { type FC, useEffect, useRef, useState } from 'react';
import { type ScrollView as TypeScrollView } from 'react-native';
import { type MetadataDocument } from '@walless/store';
import { ScrollView, Stack } from '@walless/ui';
import { appState } from 'state/app';
import { resources } from 'utils/config';
import { useSnapshot } from 'valtio';

import { DetailTool } from '../../internal';
import TargetWrapper from '../../TargetWrapper';
import ScreenContainer from '../components/ScreenContainer';

import { type CardSkin } from './WalletCard/shared';
import CollectibeList from './CollectibleList';
import { mockMetadata } from './internal';
import MainFeatures from './MainFeatures';
import { type TabAble, layoutTabs } from './shared';
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
			<Stack gap={18} width={380}>
				<ScrollView width="100%" marginTop={12} horizontal paddingLeft={18}>
					<WalletCard
						skin={suiCardSkin}
						token={(mainToken as MetadataDocument) || mockMetadata}
					/>
				</ScrollView>

				<Stack alignItems="center" paddingHorizontal={18}>
					<MainFeatures />
				</Stack>

				<Stack marginBottom={12} overflow="hidden">
					<Stack paddingHorizontal={18}>
						<TabsHeader
							items={layoutTabs}
							activeItem={layoutTabs[activeTabIndex]}
							onTabPress={onTabPress}
						/>
					</Stack>
					<Stack
						horizontal
						transform={[{ translateX: -(activeTabIndex * 380) }]}
					>
						<TargetWrapper isTargeted={tools.target === DetailTool.token}>
							<Stack
								paddingHorizontal={18}
								width={380}
								onLayout={({ nativeEvent }) =>
									tabPositionRef.current?.position.push(nativeEvent.layout.x)
								}
							>
								<TokenList items={subTokens as MetadataDocument[]} />
							</Stack>
						</TargetWrapper>
						<TargetWrapper
							isTargeted={tools.target === DetailTool.collectibles}
						>
							<Stack
								paddingHorizontal={18}
								width={380}
								onLayout={({ nativeEvent }) =>
									tabPositionRef.current?.position.push(nativeEvent.layout.x)
								}
							>
								<CollectibeList
									items={collectiblesList as MetadataDocument[]}
								/>
							</Stack>
						</TargetWrapper>
						<Stack />
					</Stack>
				</Stack>
			</Stack>
		</ScreenContainer>
	);
};

export default Detail;

const suiCardSkin: CardSkin = {
	backgroundSrc: resources.home.detail.backgroundSrc,
	largeIconSrc: resources.home.detail.largeIconSrc,
	iconSrc: resources.home.detail.iconSrc,
	iconColor: '#000000',
	iconSize: 16,
};
