import { FC } from 'react';
import { Stack, Text } from '@walless/ui';
import BulletSeparator from 'components/BulletSeparator';

import { ToolboxItem } from '../internal';

import SocialCard from './SocialCard';

interface ToolboxProps {
	tools: ToolboxItem[];
	activeTool: ToolboxItem;
	setActiveTool: (tool: ToolboxItem) => void;
}

const Toolbox: FC<ToolboxProps> = ({ tools, activeTool, setActiveTool }) => {
	const borderColor = '#56667480';

	return (
		<Stack
			width="100%"
			backgroundColor="#000000"
			flexDirection="row"
			borderRadius={10}
		>
			<Stack flexGrow={1}>
				<Stack
					flexDirection="row"
					alignItems="center"
					gap={80}
					paddingHorizontal={20}
				>
					{tools.map((tool) => (
						<Text
							key={tool.name}
							paddingVertical={20}
							fontSize={16}
							color={tool === activeTool ? '#0694D3' : 'white'}
							cursor="pointer"
							onPress={() => setActiveTool(tool)}
						>
							{tool.name}
						</Text>
					))}
				</Stack>

				<BulletSeparator backgroundColor={borderColor} paddingLeft={20} />

				<Stack flexDirection="row" flexGrow={1}>
					{activeTool.components.map((component, idx) => (
						<Stack
							key={idx}
							borderRightWidth={idx < activeTool.components.length - 1 ? 1 : 0}
							borderColor="#56667480"
							flexGrow={1}
							padding={20}
						>
							{component()}
						</Stack>
					))}
				</Stack>
			</Stack>

			<Stack
				paddingHorizontal={22}
				paddingVertical={32}
				borderLeftWidth={1}
				borderColor={borderColor}
			>
				<SocialCard />
			</Stack>
		</Stack>
	);
};

export default Toolbox;
