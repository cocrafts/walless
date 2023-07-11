import type { FC } from 'react';
import { Text } from '@walless/ui';

interface Props {
	current: number;
	limit: number;
}

const TextLimit: FC<Props> = ({ current, limit }) => {
	return (
		<Text color="#566674" fontSize={12}>
			{current} / {limit}
		</Text>
	);
};

export default TextLimit;
