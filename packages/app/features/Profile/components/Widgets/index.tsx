import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { Setting } from '@walless/icons';

import WidgetButton from './WidgetButton';

const Widgets = () => {
	const handleClickSetting = () => {
		console.log('Navigate to setting');
	};

	return (
		<View style={styles.container}>
			<WidgetButton onClick={handleClickSetting}>
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
