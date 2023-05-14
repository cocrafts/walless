import { type FC } from 'react';
import { Stack } from '@walless/ui';
import BulletSeparator from 'components/BulletSeparator';

import { type ToolboxProps } from '../internal';

import SocialCard from './SocialCard';
import ToolName from './ToolName';

const Toolbox: FC<ToolboxProps> = ({ tools, activeTool, setActiveTool }) => {
	const activeIndex = tools.findIndex((tool) => tool.name === activeTool.name);
	const bulletLeft = 20 + activeIndex * 100 + activeIndex * 32;

	return (
		<Stack
			horizontal
			borderRadius={10}
			backgroundColor="#000000"
			flexWrap="wrap"
		>
			<Stack flex={1}>
				<Stack horizontal alignItems="center" gap={32} paddingHorizontal={20}>
					{tools.map((tool) => (
						<ToolName
							key={tool.name}
							name={tool.name}
							isActive={activeTool === tool}
							onPress={() => setActiveTool(tool)}
						/>
					))}
				</Stack>
				<BulletSeparator
					backgroundColor={borderColor}
					paddingLeft={bulletLeft}
				/>
				<Stack horizontal flex={1} flexWrap="wrap">
					{activeTool.components.map((ToolComponent, i) => (
						<Stack
							key={i}
							flex={1}
							flexBasis={1}
							padding={20}
							minWidth={300}
							borderBottomWidth={1}
							borderLeftWidth={i === 0 ? 0 : 1}
							borderColor={borderColor}
						>
							<ToolComponent />
						</Stack>
					))}
				</Stack>
			</Stack>

			<Stack
				flexGrow={1}
				paddingVertical={32}
				paddingHorizontal={22}
				borderLeftWidth={1}
				borderColor={borderColor}
			>
				<SocialCard />
			</Stack>
		</Stack>
	);
};

export default Toolbox;

const borderColor = 'rgba(255, 255, 255, 0.12)';
