import React from 'react';
import { View } from '@walless/ui';
import { modalActions, ModalConfigs } from 'utils/state/modal';

import SendTokenHome from './SendTokenHome';

interface Props {
	config: ModalConfigs;
}

const SendToken: React.FC<Props> = ({ config }) => {
	const { id } = config;

	const handleCloseModal = () => modalActions.close(id);

	return (
		<View className="h-full w-screen">
			<View className="h-full bg-gradient-to-b from-[#00131F] to-[#112C3F] rounded-t-lg items-center gap-5 px-4">
				<SendTokenHome handleCloseModal={handleCloseModal} />
			</View>
		</View>
	);
};

export default SendToken;
