import type { FC } from 'react';
import { useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
	useAnimatedRef,
	useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockWidgets } from '@walless/engine';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';
import type { HeaderProps } from 'screens/Dashboard/Widget/components/StackContainer';
import { tabBarHeight } from 'utils/helper';
import { useWidgets } from 'utils/hooks';

import ExplorerSearchBar from './components/SearchBar';
import ExplorerWidgetItem from './components/WidgetItem';

interface Props {
	style?: StyleProp<ViewStyle>;
	headerComponent?: FC<HeaderProps>;
	widgets?: WidgetDocument[];
	onToggleDrawer?: () => void;
}

export const ExplorerFeature: FC<Props> = ({
	style,
	widgets = mockWidgets,
	headerComponent: HeaderComponent,
	onToggleDrawer,
}) => {
	const insets = useSafeAreaInsets();
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const [searchString, setSearchString] = useState('');
	const contentContainerStyle: ViewStyle = {
		paddingBottom: insets.bottom + tabBarHeight,
	};

	const activeWidgets = useWidgets().map((widget) => widget._id);

	const onChangeSearch = (query: string) => {
		setSearchString(query.toLowerCase());
	};

	const filterWidgetsByName = (name: string) => {
		if (!searchString.length) return true;
		return name.toLowerCase().includes(searchString);
	};

	const headerElement = HeaderComponent && (
		<HeaderComponent
			onToggleDrawer={onToggleDrawer}
			title="Explorer"
			insets={insets}
			scrollOffset={scrollOffset}
		/>
	);

	return (
		<View style={[styles.container, style]}>
			{headerElement}
			<Animated.ScrollView
				ref={scrollRef}
				scrollEventThrottle={12}
				contentContainerStyle={contentContainerStyle}
				showsVerticalScrollIndicator={false}
				stickyHeaderIndices={[0]}
			>
				<View>
					<ExplorerSearchBar
						style={styles.searchBar}
						inputStyle={styles.searchInput}
						onChangeSearch={onChangeSearch}
					/>
				</View>
				{widgets
					.filter((widget) => filterWidgetsByName(widget.name))
					.map((widget) => (
						<ExplorerWidgetItem
							key={widget._id}
							style={styles.widgetItem}
							widget={widget}
							isAdded={activeWidgets.includes(widget._id)}
						/>
					))}
			</Animated.ScrollView>
		</View>
	);
};

export default ExplorerFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'hidden',
	},
	searchBar: {
		backgroundColor: '#19232c',
		marginBottom: 8,
	},
	searchInput: {
		bottom: -8,
		marginTop: 4,
		marginHorizontal: 16,
	},
	widgetItem: {
		marginHorizontal: 16,
	},
});

export * from './components/SearchBar';
export * from './components/WidgetItem';
