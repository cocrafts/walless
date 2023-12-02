import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { mockWidgets } from '@walless/engine';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';

import SearchHeader from './components/SearchHeader';
import WidgetItem from './components/WidgetItem';

interface Props {
	style?: StyleProp<ViewStyle>;
	navigationComponent?: ReactNode;
	scrollContentContainerStyle?: StyleProp<ViewStyle>;
	widgets?: WidgetDocument[];
}

const searchTitleHeight = 54;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedView = Animated.createAnimatedComponent(View);

export const ExplorerFeature: FC<Props> = ({
	style,
	navigationComponent,
	scrollContentContainerStyle,
	widgets = mockWidgets,
}) => {
	const offset = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (e) => {
			offset.value = e.contentOffset.y;
		},
	});

	const scrollAnimatedStyle = useAnimatedStyle(() => {
		return {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			transform: [
				{
					translateY:
						offset.value > searchTitleHeight
							? -searchTitleHeight
							: -offset.value,
				},
			],
		};
	}, [offset]);

	const [searchString, setSearchString] = useState('');
	const [contentOffset, setContentOffset] = useState(0);
	const contentContainer = {
		marginHorizontal: 15,
		paddingTop: contentOffset,
	} as ViewStyle;

	const onChangeSearch = (query: string) => {
		setSearchString(query.toLowerCase());
	};

	const filterWidgetsByName = (name: string) => {
		if (!searchString.length) return true;
		return name.toLowerCase().includes(searchString);
	};

	return (
		<View style={[styles.container, style]}>
			<AnimatedScrollView
				onScroll={scrollHandler}
				scrollEventThrottle={20}
				contentContainerStyle={[contentContainer, scrollContentContainerStyle]}
				showsVerticalScrollIndicator={false}
			>
				{widgets
					.filter((widget) => filterWidgetsByName(widget.name))
					.map((widget) => (
						<WidgetItem key={widget._id} widget={widget} />
					))}
			</AnimatedScrollView>
			<AnimatedView style={scrollAnimatedStyle}>
				<SearchHeader
					onLayout={({ nativeEvent }) => {
						setContentOffset(nativeEvent.layout.height);
					}}
					onChangeSearch={onChangeSearch}
				/>
			</AnimatedView>
		</View>
	);
};

export default ExplorerFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10,
		overflow: 'hidden',
	},
});
