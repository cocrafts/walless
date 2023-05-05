import { FC } from 'react';
import { Stack } from '@walless/ui';

import { PreviewProps } from '../../internal';

import LayoutCard from './LayoutCard';

const Project: FC<PreviewProps> = ({ target }) => {
	return (
		<Stack>
			<LayoutCard target={target} />
		</Stack>
	);
};

export default Project;
