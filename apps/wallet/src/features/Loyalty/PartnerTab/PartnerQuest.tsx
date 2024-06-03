import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import type { Action, UserProgress } from '@walless/graphql';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	SwipeDownGesture,
} from '@walless/gui';
import { Times } from '@walless/icons';
import { ModalId } from 'modals/types';
import { loyaltyState } from 'state/loyalty';
import { useSafeAreaInsets } from 'utils/hooks';
import { useSnapshot } from 'valtio';

import ActionCard from '../ActionCard';
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

const CLOSE_ICON_SIZE = 12;

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
		modalActions.hide(config.id as string);
	};

	return (
		<SwipeDownGesture style={[styles.container, safeAreaStyle]}>
			<View style={styles.headerContainer}>
				<View style={{ width: CLOSE_ICON_SIZE }} />
				<Text style={styles.headerText}>{partner} Quest</Text>
				<TouchableOpacity onPress={handleCloseModal}>
					<Times size={CLOSE_ICON_SIZE} color="white" />
				</TouchableOpacity>
			</View>

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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
		positionOffset: {
			y: 40,
		},
	});
};
