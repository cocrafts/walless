import { type FC, type ReactNode } from 'react';
import { Times } from '@walless/icons';
import { Button, Stack, Text } from '@walless/ui';

interface Props {
	id: string;
	label: string;
	prefix?: ReactNode;
	onRemove: (id: string) => void;
}

const ItemTag: FC<Props> = ({ id, label, prefix, onRemove }) => {
	const handleRemove = () => onRemove(id);

	return (
		<Stack
			horizontal
			alignItems="center"
			paddingLeft={5}
			backgroundColor={'#2C3741'}
		>
			{prefix}
			<Text paddingLeft={5}>{label}</Text>
			<Button
				paddingLeft={10}
				paddingRight={5}
				backgroundColor={'transparent'}
				onPress={handleRemove}
			>
				<Times size={14} />
			</Button>
		</Stack>
	);
};

export default ItemTag;
