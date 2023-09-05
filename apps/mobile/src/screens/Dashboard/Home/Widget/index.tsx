import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { HomeParamList } from 'utils/navigation';

type Props = StackScreenProps<HomeParamList, 'Widget'>;

export const WidgetScreen: FC<Props> = (props) => {
	console.log(props.route);
	return (
		<View style={styles.container}>
			<Text>Home Screen</Text>
		</View>
	);
};

export default WidgetScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
