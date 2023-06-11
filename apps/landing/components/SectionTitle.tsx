import { type FC } from 'react';
import { Text } from '@walless/ui';

interface Props {
	title: string;
}

const SectionTitle: FC<Props> = ({ title }) => {
	return (
		<Text fontSize={32} fontWeight="600" textAlign="center">
			{title}
		</Text>
	);
};

export default SectionTitle;
