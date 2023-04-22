import { FC } from 'react';
import { Stack } from '@walless/ui';
import { useSnapshot } from 'valtio';

import { ModalState, modalState } from '../../state/modal';

import ModalContainer from './Container';

export const ModalManager: FC = () => {
	const { map } = useSnapshot<ModalState>(modalState);
	const instances = Array.from(map.values());

	return (
		<Stack fullscreen pointerEvents="box-none">
			{instances.map((item) => {
				return <ModalContainer key={item.id} item={item} />;
			})}
		</Stack>
	);
};

export default ModalManager;
