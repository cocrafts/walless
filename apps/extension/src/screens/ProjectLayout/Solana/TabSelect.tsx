import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { AnimatedView, Text, TouchableOpacity, View } from '@walless/ui';
import { useSharedValue } from 'utils/hook';

interface Props {
	tabIds: string[];
	handleChangeTab: (id: string) => void;
}

export const TabSelect: React.FC<Props> = ({ tabIds, handleChangeTab }) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [horizontalDimension, setHorizontalDimension] = useState(0);
	const left = useSharedValue(0);
	const highLightBgStyle = useAnimatedStyle(() => {
		return {
			left: withTiming(left.value),
		};
	});

	useEffect(() => {
		left.value = horizontalDimension * activeTabIndex;
	}, [activeTabIndex]);

	return (
		<View className="mx-4 mt-4 py-2 px-3 border border-[color:#203C4E] rounded-xl bg-[color:#01131F]">
			<View className="flex-row">
				<AnimatedView style={[styles.highlightBg, highLightBgStyle]} />
				{tabIds.map((id, index) => {
					const isActive = index === activeTabIndex;

					return (
						<TouchableOpacity
							key={id}
							className="flex-1"
							onLayout={({ nativeEvent: { layout } }) =>
								setHorizontalDimension(layout.width)
							}
							onPress={() => {
								handleChangeTab(id);
								setActiveTabIndex(index);
							}}
						>
							<Text
								className={`text-center py-2 text-xs ${
									isActive ? 'font-medium' : 'font-normal [color:#587A90]'
								}`}
							>
								{id}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

export default TabSelect;

const styles = StyleSheet.create({
	highlightBg: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 100,
		width: 100,
		backgroundColor: '#1D4A69',
		borderRadius: 5,
	},
});
