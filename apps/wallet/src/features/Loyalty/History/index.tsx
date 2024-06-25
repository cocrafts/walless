import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { ViewStyle } from 'react-native';
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import { runtime } from '@walless/core';
import type { HistoryItem } from '@walless/graphql';
import { queries } from '@walless/graphql';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	SwipeDownGesture,
} from '@walless/gui';
import { ModalId } from 'modals/types';
import { qlClient } from 'utils/graphql';
import { useSafeAreaInsets } from 'utils/hooks';

import ModalHeader from '../components/ModalHeader';

import Item from './Item';

type PartnerQuestProps = {
	safeAreaInsets: EdgeInsets;
};

type Props = PartnerQuestProps & {
	config: ModalConfigs;
};

const HistoryModal: FC<Props> = ({ config }) => {
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchHistory = async () => {
			setLoading(true);

			try {
				const { loyaltyHistory } = await qlClient.request<{
					loyaltyHistory: HistoryItem[];
				}>(queries.loyaltyHistory);

				setHistory(loyaltyHistory.toReversed());
			} catch (err) {
				console.error(err);
			}

			setLoading(false);
		};

		fetchHistory();
	}, []);

	const safeAreaInsets = useSafeAreaInsets();

	const safeAreaStyle: ViewStyle = {
		paddingBottom: safeAreaInsets.bottom,
	};

	const handleCloseModal = () => {
		modalActions.hide(config.id);
	};

	return (
		<SwipeDownGesture
			style={[styles.container, safeAreaStyle]}
			callbackOnClose={handleCloseModal}
			gestureEnable={runtime.isMobile}
		>
			<ModalHeader
				style={styles.headerContainer}
				content="History"
				onPressClose={handleCloseModal}
			/>

			{loading ? (
				<View style={styles.centerContainer}>
					<ActivityIndicator size="large" />
				</View>
			) : history.length === 0 ? (
				<View style={styles.centerContainer}>
					<Text style={styles.emptyText}>History is empty</Text>
				</View>
			) : (
				<ScrollView
					contentContainerStyle={styles.scrollViewContainer}
					showsVerticalScrollIndicator={false}
				>
					{history.map((historyItem, index) => (
						<Item
							key={historyItem.doneAt}
							data={historyItem}
							style={{
								marginBottom: index !== history.length - 1 ? 20 : 0,
							}}
						/>
					))}
				</ScrollView>
			)}
		</SwipeDownGesture>
	);
};

export default HistoryModal;

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
	headerContainer: {
		paddingHorizontal: 8,
	},
	scrollViewContainer: {
		marginBottom: 16,
	},
	centerContainer: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyText: {
		fontSize: 16,
		color: '#798997',
	},
});

export const showHistory = (props: PartnerQuestProps) => {
	modalActions.show({
		id: ModalId.LoyaltyHistory,
		component: ({ config }) => <HistoryModal config={config} {...props} />,
		animateDirection: AnimateDirections.Top,
		bindingDirection: BindDirections.InnerBottom,
		fullHeight: true,
		positionOffset: {
			y: 40 + props.safeAreaInsets.top,
		},
	});
};
