import { FC } from 'react';
import { useSnapshot } from 'valtio';

import { ModalState, modalState } from '../../state/modal';
import { ZStack } from '../styled';

import ModalContainer from './Container';

export const ModalManager: FC = () => {
	const { map } = useSnapshot<ModalState>(modalState);
	const instances = Array.from(map.values());

	return (
		<ZStack fullscreen pointerEvents="box-none">
			{instances.map((item) => {
				return <ModalContainer key={item.id} item={item} />;
			})}
		</ZStack>
	);
};

export default ModalManager;
