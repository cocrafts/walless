import { type FC } from 'react';
import { type ViewStyle, StyleSheet } from 'react-native';
import { Hoverable, View } from '@walless/gui';

export interface SlideAble {
	_id?: string;
}

interface Props {
	style?: ViewStyle;
	items: SlideAble[];
	activeItem: SlideAble;
	indicatorWidth?: number;
	indicatorHeight?: number;
}

export const SlideHandler: FC<Props> = ({
	style,
	items,
	activeItem,
	indicatorWidth = 45,
	indicatorHeight = 6,
}) => {
	return (
		<View style={[styles.container, style]}>
			{items.map((item) => {
				const isActive = item._id === activeItem._id;
				const itemStyle = {
					width: indicatorWidth,
					height: indicatorHeight,
					borderRadius: indicatorHeight / 2,
					backgroundColor: isActive ? '#0694D3' : '#202D38',
				};

				return <Hoverable key={item._id} style={itemStyle} />;
			})}
		</View>
	);
};

export default SlideHandler;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 12,
	},
});
