import { FC } from 'react';
import { ToolboxComponentProps } from 'features/home/EditTool/internal';

import EditProjectAvatar from './EditProjectAvatar';
import EditProjectBanner from './EditProjectBanner';
import EditProjectDesc from './EditProjectDesc';
import EditProjectName from './EditProjectName';

const ProjectInfoComponents: FC<ToolboxComponentProps>[] = [
	EditProjectName,
	EditProjectDesc,
	EditProjectBanner,
	EditProjectAvatar,
];

export default ProjectInfoComponents;
