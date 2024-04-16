import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Action, Progress, Record } from '@walless/graphql';
import { queries } from '@walless/graphql';
import { qlClient } from 'utils/graphql';

import ActionCard from './ActionCard';

interface Props {
	progress?: Progress;
}

const AchievementsTab: FC<Props> = ({ progress }) => {
	const [actions, setActions] = useState<Action[]>([]);

	useEffect(() => {
		const fetchActiveActions = async () => {
			const { loyaltyActiveActions } = await qlClient.request<{
				loyaltyActiveActions: Action[];
			}>(queries.loyaltyActiveActions);

			return loyaltyActiveActions;
		};

		try {
			fetchActiveActions().then((activeActions) => {
				setActions(activeActions);
			});
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<View style={styles.container}>
			{actions.map((action) => (
				<ActionCard
					key={action.id}
					action={action}
					isPerformed={(() => {
						if (!progress) {
							return false;
						}
						return (progress.records as Record[]).some(
							(record) => record.actionId === action.id,
						);
					})()}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
});

export default AchievementsTab;
