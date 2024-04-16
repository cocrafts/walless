import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { type Action, queries } from '@walless/graphql';
import { qlClient } from 'utils/graphql';

import ActionCard from './ActionCard';

const AchievementsTab = () => {
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
				console.log('--> activeActions', activeActions);
			});
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<View style={styles.container}>
			{actions.map((action) => (
				<ActionCard key={action.id} action={action} isPerformed={false} />
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
