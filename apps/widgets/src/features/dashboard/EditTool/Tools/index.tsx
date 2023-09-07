import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import type { ToolboxProps } from '../internal';

import ToolsContainer from './tools/components/ToolsContainer';
import ToolName from './ToolName';

const Tools: FC<ToolboxProps> = ({ tools, activeTool, setActiveTool }) => {
	return (
		<View style={styles.container}>
			<View horizontal>
				{tools.map((tool) => (
					<ToolName
						key={tool.name}
						name={tool.name}
						isActive={activeTool.name === tool.name}
						onPress={() => setActiveTool(tool)}
					/>
				))}
			</View>

			<ToolsContainer components={activeTool.components} />
		</View>
	);
};

export default Tools;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 10,
		backgroundColor: '#000000',
		flexWrap: 'wrap',
	},
});
