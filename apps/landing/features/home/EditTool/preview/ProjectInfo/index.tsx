import { FC } from 'react';
import { Stack } from '@walless/ui';

import { PreviewProps } from '../../internal';

import LayoutCard from './LayoutCard';

export interface LayoutCardProps {
	banner: string;
	avatar: string;
	name: string;
	description: string;
}

const ProjectInfo: FC<PreviewProps> = ({ target }) => {
	return (
		<Stack>
			<LayoutCard target={target} />
		</Stack>
	);
};

export default ProjectInfo;
