import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import PointTag from '../ActionCard/PointTag';
import { canUserPerformAction } from '../internal';

interface PartnerQuestProps {
	partner: string;
	actions: Action[];
	totalPoints: number;
}

type Props = PartnerQuestProps & {
	config: ModalConfigs;
};

const CLOSE_ICON_SIZE = 12;

const PartnerQuestModal: FC<Props> = ({ partner, actions, totalPoints }) => {
	const { userProgress } = useSnapshot(loyaltyState);
	const safeAreaInsets = useSafeAreaInsets();

	const safeAreaStyle: ViewStyle = {
		paddingBottom: safeAreaInsets.bottom,
	};

	return (
		<SwipeDownGesture style={[styles.container, safeAreaStyle]}>
			<View style={styles.headerContainer}>
				<View style={{ width: CLOSE_ICON_SIZE }} />
				<Text style={styles.headerText}>{partner} Quest</Text>
				<TouchableOpacity>
					<Times size={CLOSE_ICON_SIZE} color="white" />
				</TouchableOpacity>
			</View>

			<View>
				<View>
					<Text>Progress</Text>
					<PointTag points={totalPoints} />
				</View>
			</View>

			<View style={styles.cardContainer}>
				{actions.map((action) => (
					<ActionCard
						key={action.id}
						action={action as Action}
						canUserPerformAction={canUserPerformAction(
							userProgress as UserProgress,
							action as Action,
						)}
					/>
				))}
			</View>
		</SwipeDownGesture>
	);
};

export default PartnerQuestModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#131C24',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		height: '100%',
	},
	cardContainer: {
		paddingHorizontal: 16,
		gap: 8,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 24,
		paddingVertical: 12,
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
		wrapperMargin: { top: 40 },
	});
};
