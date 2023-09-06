import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import type { ToolboxProps } from '../internal';

import ToolsContainer from './tools/components/ToolsContainer';
import ToolName from './ToolName';

const Tools: FC<ToolboxProps> = ({ tools, activeTool, setActiveTool }) => {
	return (
		<View style={styles.container}>
			{tools.map((tool) => (
				<View key={tool.name}>
					<View style={styles.toolsHeader}>
						<ToolName
							key={tool.name}
							name={tool.name}
							isActive={true}
							onPress={() => setActiveTool(tool)}
						/>
					</View>
					{/* <View style={styles.toolsContainer}>
						{tool.components.map((ToolComponent, i) => (
							<ToolComponent key={i} />
						))}
					</View> */}
				</View>
			))}

			<ToolsContainer components={activeTool.components} />
			{/* <View style={styles.toolsContainer}>
				{activeTool.components.map((ToolComponent, i) => (
					<ToolComponent key={i} />
				))}
			</View> */}
		</View>
	);
};

export default Tools;

const styles = StyleSheet.create({
	toolsHeader: {},
	container: {
		flex: 1,
		borderRadius: 10,
		backgroundColor: '#000000',
		flexWrap: 'wrap',
		gap: 50,
	},
	toolsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
