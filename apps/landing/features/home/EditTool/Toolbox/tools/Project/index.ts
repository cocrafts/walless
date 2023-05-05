import { FC } from 'react';
import { ToolboxComponentProps } from 'features/home/EditTool/internal';

import EditProjectLogo from './EditProjectLogo';
import EditProjectBanner from './EditProjectBanner';
import EditProjectDesc from './EditProjectDesc';
import EditProjectName from './EditProjectName';

const ProjectTools: FC<ToolboxComponentProps>[] = [
	EditProjectName,
	EditProjectDesc,
	EditProjectLogo,
	EditProjectBanner,
];

export default ProjectTools;
