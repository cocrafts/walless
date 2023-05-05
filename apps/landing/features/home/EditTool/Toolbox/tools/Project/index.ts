import { FC } from 'react';
import { ToolboxComponentProps } from 'features/home/EditTool/internal';

import EditProjectBanner from './EditProjectBanner';
import EditProjectDesc from './EditProjectDesc';
import EditProjectLogo from './EditProjectLogo';
import EditProjectName from './EditProjectName';

const ProjectTools: FC<ToolboxComponentProps>[] = [
	EditProjectName,
	EditProjectDesc,
	EditProjectLogo,
	EditProjectBanner,
];

export default ProjectTools;
