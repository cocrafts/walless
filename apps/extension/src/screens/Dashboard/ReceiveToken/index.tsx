import { FC, useCallback } from 'react';
import { View } from '@walless/ui';
import { modalActions, ModalConfigs } from 'utils/state/modal';

import ReceiveTokenHome from './ReceiveTokenHome';

interface ReceiveTokenProps {
	config: ModalConfigs;
}

const ReceiveToken: FC<ReceiveTokenProps> = ({ config }) => {
	const { id } = config;

	const handleCloseModal = useCallback((id: string) => {
		modalActions.close(id);
	}, []);

	return (
		<View className="h-full w-screen">
			<View className="h-full bg-gradient-to-b from-[#00131F] to-[#112C3F] rounded-t-lg items-center gap-5 px-6 w-full">
				<ReceiveTokenHome
					handleCloseModal={() => {
						handleCloseModal(id);
					}}
				/>
			</View>
		</View>
	);
};
export default ReceiveToken;
