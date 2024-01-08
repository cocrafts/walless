import type { FC } from 'react';
import { useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
	useAnimatedRef,
	useScrollViewOffset,
} from 'react-native-reanimated';
import { mockWidgets } from '@walless/engine';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';
import { StackHeader } from 'components/StackContainer';
import { useSafeAreaInsets, useWidgets } from 'utils/hooks';

import ExplorerSearchBar from './SearchBar';
import ExplorerWidgetItem from './WidgetItem';

interface Props {
	style?: StyleProp<ViewStyle>;
	widgets?: WidgetDocument[];
	onToggleDrawer?: () => void;
}

export const ExplorerFeature: FC<Props> = ({
	style,
	widgets = mockWidgets,
	onToggleDrawer,
}) => {
	const insets = useSafeAreaInsets();
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const [searchString, setSearchString] = useState('');
	const contentContainerStyle: ViewStyle = {
		paddingBottom: insets.bottom,
	};

	const activeWidgets = useWidgets().map((widget) => widget._id);

	const onChangeSearch = (query: string) => {
		setSearchString(query.toLowerCase());
	};

	const filterWidgetsByName = (name: string) => {
		if (!searchString.length) return true;
		return name.toLowerCase().includes(searchString);
	};

	return (
		<View style={style}>
			<StackHeader
				onToggleDrawer={onToggleDrawer}
				title="Explorer"
				insets={insets}
				scrollOffset={scrollOffset}
			/>
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
