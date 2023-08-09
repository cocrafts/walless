import type { FC } from 'react';
import { Text } from '@walless/gui';

interface Props {
	current: number;
	limit: number;
}

const TextLimit: FC<Props> = ({ current, limit }) => {
	return (
		<Text>
			{current} / {limit}
		</Text>
	);
};

export default TextLimit;
