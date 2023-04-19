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
				justifyContent="center"
				alignItems="center"
				width={348}
				height={348}
				backgroundColor="#242F38"
				borderRadius={16}
				gap={36}
			>
				<QRCode value="https://www.youtube.com/watch?v=xEeFrLSkMm8" />
				<WalletAddress
					network="Solana"
					networkIcon="/img/send-token/icon-solana.png"
					address="2Q3X4Y5Z6W7V8U9T1R2E3W4Q5T6Y7U8I9O0P1A2S3D4F5G6H7J8K9L0Z1X2C3V4B5N6M7"
				/>
			</Stack>
		</ModalWrapper>
	);
};

export default ReceiveTokenScreen;
