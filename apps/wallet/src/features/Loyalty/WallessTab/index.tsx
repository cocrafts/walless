import { StyleSheet, Text, View } from 'react-native';
import type { Action, UserProgress } from '@walless/graphql';
import { loyaltyState } from 'state/loyalty';
import { useSnapshot } from 'utils/hooks';

import ActionCard from '../ActionCard';
import { canUserPerformAction } from '../internal';

const WallessTab = () => {
	const { userProgress, wallessActions } = useSnapshot(loyaltyState);

	return (
		<View style={styles.container}>
			{wallessActions.length === 0 && (
				<View style={styles.centerContainer}>
					<Text style={styles.noTaskText}>
						There is no available tasks, please comeback later!
					</Text>
				</View>
			)}

			{wallessActions.map((action) => (
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
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 8,
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noTaskText: {
		color: 'white',
		textAlign: 'center',
	},
});

export default WallessTab;
