import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { Setting } from '@walless/icons';

import WidgetButton from './WidgetButton';

export interface WidgetProps {
	onSettingPress?: () => void;
}

export const Widgets: FC<WidgetProps> = ({ onSettingPress }) => {
	return (
		<View style={styles.container}>
			<WidgetButton onClick={onSettingPress}>
				<Setting size={14} color="white" />
			</WidgetButton>
		</View>
	);
};

export default Widgets;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
	},
});
