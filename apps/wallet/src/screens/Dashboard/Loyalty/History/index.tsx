import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { loyaltyProfile } from '@walless/graphql/query';
import { Text } from '@walless/gui';
import { QueryKey } from 'utils/constants';
import { qlClient } from 'utils/graphql';
import { sharedStyles } from 'utils/style';

import HistoryItem from './HistoryItem';

export const LoyaltyHistoryScreen = () => {
	const { data, isLoading } = useQuery({
		queryKey: [QueryKey.LoyaltyProfile],
		queryFn: async () =>
			qlClient.request(loyaltyProfile, {
				first: 5,
				after: '',
			}),
		staleTime: 1000 * 60 * 10,
		placeholderData: keepPreviousData,
	});

	if (!isLoading && !data?.loyaltyProfile.history?.edges) {
		<View style={styles.emptyHistoryContainer}>
			<Text style={styles.emptyHistoryText}>
				Start your Walless Reward journey today!
			</Text>
		</View>;
	}

	return (
		<View>
			{data?.loyaltyProfile.history?.edges && (
				<FlatList
					data={data.loyaltyProfile.history.edges}
					renderItem={({ item: edge }) => (
						<HistoryItem key={edge.node.id} taskRecord={edge.node} />
					)}
				/>
			)}

			{isLoading && <ActivityIndicator />}
		</View>
	);
};

export default LoyaltyHistoryScreen;

const styles = StyleSheet.create({
	emptyHistoryContainer: {
		flexGrow: 1,
		...sharedStyles.flexCenter,
	},
	emptyHistoryText: {
		fontSize: 16,
		fontWeight: '500',
	},
});
