import { FC } from 'react';
import { ModalConfigs } from '@walless/app';
import { Stack } from '@walless/ui';

import ModalHeader from '../components/ModalHeader';
import ModalWrapper from '../components/ModalWrapper';

import QRCode from './components/QRCode';
import WalletAddress from './components/WalletAddress';

const ReceiveTokenScreen: FC<{ config: ModalConfigs }> = ({ config }) => {
	return (
		<ModalWrapper>
			<ModalHeader content="Receive" config={config} />
			<Stack
				flexGrow={1}
				justifyContent="center"
				alignItems="center"
				paddingVertical={60}
			>
				<Stack
					justifyContent="space-between"
					alignItems="center"
					width={348}
					height={348}
					backgroundColor="#242F38"
					borderRadius={16}
					paddingTop={44}
					paddingBottom={20}
				>
					<QRCode value="0xF0F9D234a0226B61EB889D75B4a8884862aA985D" />
					<WalletAddress
						network="Solana"
						networkIcon="/img/send-token/icon-solana.png"
						address="0xF0F9D234a0226B61EB889D75B4a8884862aA985D"
					/>
				</Stack>
			</Stack>
		</ModalWrapper>
	);
};

export default ReceiveTokenScreen;
