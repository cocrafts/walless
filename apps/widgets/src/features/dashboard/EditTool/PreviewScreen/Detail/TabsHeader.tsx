import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from '@walless/gui';

import type { TabAble } from './shared';

interface Props {
	items: TabAble[];
	activeItem: TabAble;
	onTabPress: (item: TabAble) => void;
}

export const TabsHeader: FC<Props> = ({ items, activeItem, onTabPress }) => {
	return (
		<View horizontal style={styles.container}>
			{items.map((item) => {
				const isActive = item.id === activeItem.id;
				const backgroundColor = isActive ? '#0694D3' : 'transparent';
				const color = isActive ? 'white' : '#566674';

				return (
					<Button
						key={item.id}
						style={{ ...styles.button, backgroundColor }}
						title={item.title}
						titleStyle={{ ...styles.buttonTitle, color }}
						onPress={() => onTabPress(item)}
					/>
				);
			})}
		</View>
	);
};

export default TabsHeader;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		padding: 4,
		backgroundColor: '#202d38',
	},
	button: {
		flex: 1,
		borderRadius: 10,
		paddingVertical: 8,
	},
	buttonTitle: {
		fontWeight: '600',
	},
});
