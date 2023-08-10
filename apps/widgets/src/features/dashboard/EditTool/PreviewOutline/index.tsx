import type { FC } from 'react';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from '@walless/gui';
import Image from 'next/image';

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
	const activeSize = 1.2;

	return (
		<View horizontal style={styles.container}>
			{tools.map((tool) => {
				const borderColor = activeTool === tool ? '#19A3E1' : 'white';
				return (
					<Button
						key={tool.name}
						style={{ ...styles.button, borderColor }}
						onPress={() => setActiveTool(tool)}
					>
						<Image
							src={tool.previewImage}
							alt={tool.name}
							width={56 * (activeTool === tool ? activeSize : 1)}
							height={84 * (activeTool === tool ? activeSize : 1)}
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
	},
	button: {
		padding: 0,
		borderWidth: 2,
		borderRadius: 5,
		backgroundColor: 'transparent',
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});
