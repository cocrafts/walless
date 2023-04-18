import { FC, useState } from 'react';
import { modalActions, ModalConfigs } from '@walless/app';
import { Times } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

import ModalWrapper from '../components/ModalWrapper';

import CollectiblesTab from './components/CollectiblesTab';
import TabBar from './components/TabBar';
import TokensTab from './components/TokensTab';

export const SendTokenScreen: FC<{ config: ModalConfigs }> = ({ config }) => {
	const [isTokensTab, setIsTokensTab] = useState(true);

	return (
		<ModalWrapper>
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
			{isTokensTab ? (
				<TokensTab modalId={config.id as string} />
			) : (
				<CollectiblesTab />
			)}
			{/* <NavBtn content="Continue" route="" /> */}
		</ModalWrapper>
	);
};

export default SendTokenScreen;
