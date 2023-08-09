import type { FC } from 'react';
import { useState } from 'react';
import { Text, View } from '@walless/gui';
import { Exclamation } from '@walless/icons';

interface Props {
	name: string;
	description: string;
}

const ToolDescription: FC<Props> = ({ name, description }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<View
			onTouchStart={() => setHovered(true)}
			onTouchEnd={() => setHovered(false)}
		>
			<Text numberOfLines={1}>{name}</Text>
			<View>
				{hovered && (
					<View>
						<Text>{description}</Text>
					</View>
				)}
				<Exclamation size={10} color="#FFFFFF4D" />
			</View>
		</View>
	);
};

export default ToolDescription;
