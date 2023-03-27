import { FC } from 'react';
import { AnimatePresence, styled } from 'tamagui';

import { modalActions, ModalConfigs, modalState } from '../../state/modal';
import { Text, XStack, YStack } from '../styled';

interface Props {
	item: ModalConfigs;
}

const AnimatableContainer = styled(YStack, {
	fullscreen: true,
	zIndex: 100,
	backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

export const ModalContainer: FC<Props> = ({ item }) => {
	const { id, withoutMask, hide } = item;
	const modalId = id as string;

	const closeModal = () => {
		const modal = modalState.map.get(modalId);
		/* AnimatePresence persist its children and state,
		 * therefore use direct state from modalState for "real-life" status */
		if (modal?.hide) return;

		modalActions.hide(modalId);
	};

	const onExitComplete = () => {
		modalActions.destroy(modalId);
	};

	return (
		<AnimatePresence onExitComplete={onExitComplete}>
			{!hide && (
				<AnimatableContainer
					key={modalId}
					animation="slow"
					enterStyle={{ opacity: 0.8 }}
					exitStyle={{ opacity: 0 }}
				>
					{!withoutMask && (
						<XStack fullscreen onPress={closeModal} backgroundColor="black" />
					)}

					<Text>ModalContainer</Text>
				</AnimatableContainer>
			)}
		</AnimatePresence>
	);
};

export default ModalContainer;
