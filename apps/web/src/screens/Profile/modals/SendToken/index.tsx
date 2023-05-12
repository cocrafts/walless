import { type FC, useState } from 'react';
import { type ModalConfigs } from '@walless/gui';

import ModalHeader from '../components/ModalHeader';
import ModalWrapper from '../components/ModalWrapper';

import CollectiblesTab from './components/CollectiblesTab';
import TabBar from './components/TabBar';
import TokensTab from './components/TokensTab';

export const SendTokenScreen: FC<{ config: ModalConfigs }> = ({ config }) => {
	const [isTokensTab, setIsTokensTab] = useState(true);

	return (
		<ModalWrapper>
			<ModalHeader content="Send" config={config} />

			<TabBar isTokensTab={isTokensTab} setIsTokensTab={setIsTokensTab} />

			{isTokensTab ? (
				<TokensTab modalId={config.id as string} />
			) : (
				<CollectiblesTab />
			)}
		</ModalWrapper>
	);
};

export default SendTokenScreen;
