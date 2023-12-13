import { type FC, useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import {
	ExplorerSearchBar,
	ExplorerWidgetItem,
	StackHeader,
	universalActions,
	useResponsive,
	useUniversalInsets,
	useWidgets,
} from '@walless/app';
import { mockWidgets } from '@walless/engine';

export const ExplorerScreen: FC = () => {
	const [search, setSearch] = useState('');
	const { isMobileResponsive } = useResponsive();
	const insets = useUniversalInsets();
	const scrollOffset = useSharedValue(60);
	const installedWidgets = useWidgets();
	const filteredWidgets = useMemo(() => {
		return mockWidgets.filter((widget) => {
			return widget?.name.toLowerCase().includes(search);
		});
	}, [mockWidgets, search]);

	const scrollContentContainerStyle: ViewStyle = {
		paddingHorizontal: 18,
		paddingBottom: Math.max(insets.bottom, 12),
	};

	const onSearch = (query: string) => {
		setSearch(query.toLowerCase());
	};

	return (
		<View style={styles.container}>
			{isMobileResponsive && (
				<StackHeader
					title="Explore"
					scrollOffset={scrollOffset}
					insets={insets}
					onToggleDrawer={() => universalActions.toggleDrawer()}
				/>
			)}
			<ExplorerSearchBar
				style={styles.searchBar}
				inputStyle={styles.searchInput}
				onChangeSearch={onSearch}
			/>
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={scrollContentContainerStyle}
			>
				{filteredWidgets.map((widget) => {
					return (
						<ExplorerWidgetItem
							key={widget._id}
							widget={widget}
							isAdded={!!installedWidgets.find((i) => i._id === widget._id)}
						/>
					);
				})}
			</Animated.ScrollView>
		</View>
	);
};

export default ExplorerScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchBar: {
		zIndex: 1,
		backgroundColor: '#19232c',
	},
	searchInput: {
		bottom: -8,
		marginBottom: 4,
		marginHorizontal: 18,
	},
});
