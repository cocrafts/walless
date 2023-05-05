import { FC } from 'react';
import { Stack } from '@walless/ui';
import { AppState, appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';

import { PreviewProps } from '../../internal';

import LayoutCard from './LayoutCard';

const Project: FC<PreviewProps> = ({ target }) => {
	const { tools } = useSnapshot<AppState>(appState);

	return (
		<Stack>
			<LayoutCard projectState={tools.project} target={target} />
		</Stack>
	);
};

export default Project;
