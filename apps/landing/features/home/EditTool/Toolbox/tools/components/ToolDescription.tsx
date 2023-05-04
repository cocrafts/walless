import { FC, useState } from 'react';
import { Exclamation } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

interface Props {
	name: string;
	description: string;
}

const ToolDescription: FC<Props> = ({ name, description }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<Stack flexDirection="row" alignItems="center" gap={4}>
			<Text>{name}</Text>
			<Stack
				onHoverIn={() => setHovered(true)}
				onHoverOut={() => setHovered(false)}
			>
				{hovered && (
					<Stack
						position="absolute"
						bottom="100%"
						x="calc(-50% + 6px)"
						alignItems="center"
					>
						<Text
							borderRadius={6}
							padding={12}
							width={160}
							backgroundColor="white"
							textAlign="center"
							color="#19232C"
							fontSize={12}
						>
							{description}
						</Text>
						<Stack
							position="relative"
							top={-6}
							rotate="45deg"
							width={12}
							height={12}
							borderRadius={3}
							backgroundColor="white"
						/>
					</Stack>
				)}
				<Exclamation size={12} color="#FFFFFF4D" />
			</Stack>
		</Stack>
	);
};

export default ToolDescription;
