import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Image, Text, View } from '@walless/ui';
import { resources } from 'utils/config';

import { tokens } from './internal';

export const TokensTab: React.FC = () => {
	return (
		<FlatList
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			data={tokens}
			renderItem={({ item, index }) => {
				const isFirstItem = index === 0;

				return (
					<View
						className={`py-2 px-3 flex-row items-center border-[color:#203C4E] ${
							isFirstItem ? 'border-t-0' : 'border-t'
						}`}
					>
						<Image
							source={resources.icons.solana}
							className="h-4/5 aspect-square rounded-full"
						/>
						<View className="px-2 flex-1">
							<Text className="font-semibold text-base">{item.symbol}</Text>
							<Text className="text-xs opacity-50">
								{item.price} {item.currency}
							</Text>
						</View>
						<View className="items-end">
							<Text className="font-semibold text-base">
								{item.balance || 0}
							</Text>
							<Text className="text-xs opacity-50">
								{item.price * (item.balance || 0)} {item.currency}
							</Text>
						</View>
					</View>
				);
			}}
		/>
	);
};

export default TokensTab;

const styles = StyleSheet.create({
	container: {
		marginTop: 16,
		paddingHorizontal: 16,
		width: 360,
	},
	contentContainer: {
		borderColor: '#203C4E',
		borderRadius: 12,
		backgroundColor: '#01131F',
	},
});
