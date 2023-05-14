import { type FC } from 'react';
import { type ViewStyle, StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import { type TabAble } from './shared';
import TabItem from './TabItem';

interface Props {
	style?: ViewStyle;
	items: TabAble[];
	activeItem: TabAble;
	onTabPress?: (item: TabAble) => void;
}

export const TabsHeader: FC<Props> = ({
	style,
	items,
	activeItem,
	onTabPress,
}) => {
	return (
		<View style={[styles.container, style]}>
			{items.map((item) => {
				const isActive = item.id === activeItem.id;
				const backgroundColor = isActive ? '#0694D3' : 'transparent';
				const color = isActive ? 'white' : '#566674';

				return (
					<TabItem
						key={item.id}
						item={item}
						backgroundColor={backgroundColor}
						color={color}
						onPress={onTabPress}
					/>
				);
			})}
		</View>
	);
};

export default TabsHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#202d38',
		borderRadius: 10,
		padding: 4,
	},
});

export * from './shared';
