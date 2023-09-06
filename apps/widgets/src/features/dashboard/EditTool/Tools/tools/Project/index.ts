import type { FC } from 'react';

import EditProjectBanner from './EditProjectBanner';
import EditProjectDesc from './EditProjectDesc';
import EditProjectLogo from './EditProjectLogo';
import EditProjectName from './EditProjectName';

const ProjectTools: FC[] = [
	EditProjectName,
	EditProjectDesc,
	EditProjectLogo,
	EditProjectBanner,
];

export default ProjectTools;
