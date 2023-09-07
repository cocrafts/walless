import type { FC } from 'react';
import { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, dimensionState, View } from '@walless/gui';
// import Image from 'next/image';
import { useSnapshot } from 'valtio';

import type { ToolboxItem } from '../internal';

interface PreviewOutlineProps {
	tools: ToolboxItem[];
	activeTool: ToolboxItem;
	setActiveTool: (tool: ToolboxItem) => void;
}

const PreviewOutline: FC<PreviewOutlineProps> = ({
	tools,
	activeTool,
	setActiveTool,
}) => {
	const { responsiveLevel } = useSnapshot(dimensionState);
	const activeSize = responsiveLevel < 2 ? 1.2 : 1;
	const width = [56, 56, 48, 40][responsiveLevel];

	return (
		<View horizontal={responsiveLevel < 2} style={styles.container}>
			{tools.map((tool) => {
				const borderColor = activeTool === tool ? '#19A3E1' : 'white';
				return (
					<Button
						key={tool.name}
						style={{ ...styles.button, borderColor }}
						onPress={() => setActiveTool(tool)}
					>
						<Image
							source={{ uri: tool.previewImage }}
							alt={tool.name}
							style={{
								width: width * (activeTool === tool ? activeSize : 1),
								aspectRatio: 56 / 84,
							}}
						/>
					</Button>
				);
			})}
		</View>
	);
};

export default memo(PreviewOutline);

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		gap: 10,
	},
	button: {
		borderWidth: 2,
		borderRadius: 5,
		backgroundColor: 'transparent',
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});
