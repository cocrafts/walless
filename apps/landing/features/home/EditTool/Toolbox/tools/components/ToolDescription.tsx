import type { FC } from 'react';
import { useState } from 'react';
import { Exclamation } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

interface Props {
	name: string;
	description: string;
}

const ToolDescription: FC<Props> = ({ name, description }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<Stack
			onHoverIn={() => setHovered(true)}
			onHoverOut={() => setHovered(false)}
			userSelect="none"
			flexDirection="row"
			alignItems="center"
			gap={4}
		>
			<Text numberOfLines={1}>{name}</Text>
			<Stack>
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
							width={180}
							backgroundColor="#19232C"
							shadowColor="rgba(0, 0, 0, 0.5)"
							shadowRadius={12}
							textAlign="center"
							color="white"
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
							backgroundColor="#19232C"
						/>
					</Stack>
				)}
				<Exclamation size={10} color="#FFFFFF4D" />
			</Stack>
		</Stack>
	);
};

export default ToolDescription;
