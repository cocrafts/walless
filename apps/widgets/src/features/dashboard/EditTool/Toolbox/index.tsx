import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import type { ToolboxProps } from '../internal';

import SocialCard from './SocialCard';
import ToolName from './ToolName';

const Toolbox: FC<ToolboxProps> = ({ tools, activeTool, setActiveTool }) => {
	return (
		<View style={styles.container}>
			<View>
				<View>
					{tools.map((tool) => (
						<ToolName
							key={tool.name}
							name={tool.name}
							isActive={activeTool === tool}
							onPress={() => setActiveTool(tool)}
						/>
					))}
				</View>
				<View>
					{activeTool.components.map((ToolComponent, i) => (
						<View
							key={i}
							style={{
								flex: 1,
								flexBasis: 1,
								padding: 20,
								minWidth: 300,
								borderBottomWidth: 1,
								borderLeftWidth: i === 0 ? 0 : 1,
								borderColor: borderColor,
							}}
						>
							<ToolComponent />
						</View>
					))}
				</View>
			</View>

			<View
				style={{
					flexGrow: 1,
					paddingVertical: 32,
					paddingHorizontal: 22,
					borderLeftWidth: 1,
					borderColor: borderColor,
				}}
			>
				<SocialCard />
			</View>
		</View>
	);
};

export default Toolbox;

const borderColor = 'rgba(255, 255, 255, 0.12)';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 10,
		backgroundColor: '#000000',
		flexWrap: 'wrap',
	},
});
