import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import type { Action, UserProgress } from '@walless/graphql';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	SwipeDownGesture,
} from '@walless/gui';
import { ModalId } from 'modals/types';
import { loyaltyState } from 'state/loyalty';
import { useSafeAreaInsets } from 'utils/hooks';
import { useSnapshot } from 'valtio';

import ActionCard from '../ActionCard';
import ModalHeader from '../components/ModalHeader';
import { canUserPerformAction } from '../internal';

import PartnerProgress from './PartnerProgress';

interface PartnerQuestProps {
	partner: string;
	actions: Action[];
	totalPoints: number;
}

type Props = PartnerQuestProps & {
	config: ModalConfigs;
};

const PartnerQuestModal: FC<Props> = ({
	config,
	partner,
	actions,
	totalPoints,
}) => {
	const { userProgress } = useSnapshot(loyaltyState);
	const safeAreaInsets = useSafeAreaInsets();

	const safeAreaStyle: ViewStyle = {
		paddingBottom: safeAreaInsets.bottom,
	};

	const handleCloseModal = () => {
		modalActions.hide(config.id);
	};

	return (
		<SwipeDownGesture style={[styles.container, safeAreaStyle]}>
			<ModalHeader
				style={styles.headerContainer}
				content={`${partner} Quest`}
				onPressClose={handleCloseModal}
			/>

			<PartnerProgress totalPoints={totalPoints} totalTasks={actions.length} />

			<ScrollView
				contentContainerStyle={styles.cardContainer}
				showsVerticalScrollIndicator={false}
			>
				{actions.map((action, index) => (
					<ActionCard
						key={action.id}
						action={action as Action}
						canUserPerformAction={canUserPerformAction(
							userProgress as UserProgress,
							action as Action,
						)}
						style={{
							marginBottom: index !== actions.length - 1 ? 8 : 0,
						}}
					/>
				))}
			</ScrollView>
		</SwipeDownGesture>
	);
};

export default PartnerQuestModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#131C24',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingVertical: 12,
		paddingHorizontal: 16,
		gap: 16,
		height: '100%',
	},
	cardContainer: {
		marginBottom: 16,
	},
	headerContainer: {
		paddingHorizontal: 8,
	},
	headerText: {
		fontSize: 20,
		color: 'white',
	},
});

export const showPartnerQuest = (props: PartnerQuestProps) => {
	modalActions.show({
		id: ModalId.LoyaltyPartnerQuest,
		component: ({ config }) => <PartnerQuestModal config={config} {...props} />,
		animateDirection: AnimateDirections.Top,
		bindingDirection: BindDirections.InnerBottom,
		fullHeight: true,
		positionOffset: { y: 40 },
	});
};
