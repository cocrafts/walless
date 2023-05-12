import { type FC, memo } from 'react';
import { Stack } from '@walless/ui';
import BulletSeparator from 'components/BulletSeparator';

import { type ToolboxProps } from '../internal';

import SocialCard from './SocialCard';
import ToolName from './ToolName';

const Toolbox: FC<ToolboxProps> = ({ tools, activeTool, setActiveTool }) => {
	const borderColor = '#56667480';
	const activeIndex = tools.findIndex((tool) => tool.name === activeTool.name);
	const bulletLeft = 20 + activeIndex * 100 + activeIndex * 32;

	return (
		<Stack
			backgroundColor="#000000"
			flexDirection="row"
			borderRadius={10}
			width="100%"
		>
			<Stack flex={1}>
				<Stack
					flexDirection="row"
					alignItems="center"
					gap={32}
					paddingHorizontal={20}
				>
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

				<Stack flexDirection="row" flexGrow={1}>
					{activeTool.components.map((ToolComponent, idx) => (
						<Stack
							key={idx}
							borderRightWidth={idx < activeTool.components.length - 1 ? 1 : 0}
							borderColor="#56667480"
							width={`${100 / activeTool.components.length}%`}
							padding={20}
						>
							<ToolComponent />
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

export default memo(Toolbox);
