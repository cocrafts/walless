import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { dimensionState, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

interface Props {
	components: FC[];
}

export const ToolsContainer: FC<Props> = ({ components }) => {
	const { responsiveLevel } = useSnapshot(dimensionState);
	const [Tool1, Tool2, Tool3, Tool4] = components;
	const minWidth = [560, 400, 300, 280][responsiveLevel];

	return (
		<View horizontal={responsiveLevel < 1} style={styles.container}>
			<View
				horizontal
				style={{
					...styles.container,
					minWidth,
				}}
			>
				<Tool1 />
				<Tool2 />
			</View>
			<View
				horizontal
				style={{
					...styles.container,
					minWidth,
				}}
			>
				<Tool3 />
				<Tool4 />
			</View>
		</View>
	);
};

export default ToolsContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		flexWrap: 'wrap',
	},
});
