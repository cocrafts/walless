import { FC } from 'react';
import { AnimatePresence, styled } from 'tamagui';

import { modalActions, ModalConfigs, modalState } from '../../state/modal';
import { Stack, Text } from '../styled';

interface Props {
	item: ModalConfigs;
}

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
		<Stack fullscreen pointerEvents={hide ? 'none' : 'box-none'}>
			<AnimatePresence
				onExitComplete={onExitComplete}
				enterVariant="in"
				exitVariant="out"
			>
				{!hide && (
					<AnimatableContainer key={modalId}>
						{!withoutMask && (
							<Stack
								fullscreen
								onPress={closeModal}
								backgroundColor="rgba(0, 0, 0, 0.5)"
							/>
						)}

						<Stack pointerEvents="box-none">
							<Text onPress={closeModal}>ModalContainer</Text>
						</Stack>
					</AnimatableContainer>
				)}
			</AnimatePresence>
		</Stack>
	);
};

export default ModalContainer;

const AnimatableContainer = styled(Stack, {
	animation: 'slow',
	fullscreen: true,
	variants: {
		in: {
			true: {
				opacity: 1,
			},
		},
		out: {
			true: {
				opacity: 0,
			},
		},
	} as const,
});
