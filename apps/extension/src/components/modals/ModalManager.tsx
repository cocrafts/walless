import React from 'react';
import { View } from '@walless/ui';
import { useSnapshot } from 'utils/hook';
import { modalState } from 'utils/state/modal';

import ModalContainer from './ModalContainer';

export const ModalManager: React.FC = () => {
	const { hashmap } = useSnapshot(modalState);
	const instances = Object.values(hashmap);

	return (
		<View className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
			{instances.map((item) => (
				<ModalContainer key={item.id} item={item} />
			))}
		</View>
	);
};

export default ModalManager;
