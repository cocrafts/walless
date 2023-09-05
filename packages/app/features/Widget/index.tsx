import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { extractWidgetComponent } from './shared';

interface Props {
	id?: string;
}

export const WidgetFeature: FC<Props> = ({ id }) => {
	const WidgetComponent = extractWidgetComponent(id as string);

	return (
		<View style={styles.container}>
			<WidgetComponent />
		</View>
	);
};

export default WidgetFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
