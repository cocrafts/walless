import { FC, useState } from 'react';
import { modalActions, ModalConfigs } from '@walless/app';
import { Stack, Text } from '@walless/gui';
import { Times } from '@walless/icons';

// import { Times } from '@walless/icons';
import CollectiblesTab from './components/CollectiblesTab';
import NavBtn from './components/NavBtn';
import TabBar from './components/TabBar';
import TokensTab from './components/TokensTab';

export const SendTokenScreen: FC<{ config: ModalConfigs }> = ({ config }) => {
	const [isTokensTab, setIsTokensTab] = useState(true);

	return (
		<Stack
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			backgroundColor="#141B21"
			borderTopRightRadius={20}
			borderTopLeftRadius={20}
			paddingVertical={28}
			paddingHorizontal={28}
			gap={24}
		>
			<Stack
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
			>
				<Text color="#FFFFFF" fontWeight="500" fontSize={20}>
					Send
				</Text>
				<Stack
					onPress={() => {
						modalActions.destroy(config.id);
					}}
				>
					<Times size={16} />
				</Stack>
			</Stack>
			<TabBar isTokensTab={isTokensTab} setIsTokensTab={setIsTokensTab} />
			{isTokensTab ? <TokensTab /> : <CollectiblesTab />}
			<NavBtn content="Continue" route="" />
		</Stack>
	);
};

export default SendTokenScreen;
