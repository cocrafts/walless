import { FC, memo } from 'react';
import { Stack } from '@walless/ui';
import Image from 'next/image';

import { ToolboxItem } from '../internal';

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
		<Stack flexDirection="row" alignItems="flex-end" gap={12}>
			{tools.map((tool) => (
				<Stack
					key={tool.name}
					borderWidth={2}
					borderRadius={5}
					borderColor={activeTool === tool ? '#19A3E1' : 'white'}
					onPress={() => setActiveTool(tool)}
				>
					<Image
						src={tool.previewImage}
						alt={tool.name}
						width={56 * (activeTool === tool ? activeSize : 1)}
						height={84 * (activeTool === tool ? activeSize : 1)}
					/>
				</Stack>
			))}
		</Stack>
	);
};

export default memo(PreviewOutline);
