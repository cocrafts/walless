import type { FC } from 'react';

import EditDetailCard from './EditDetailCard';
import EditDetailIcon from './EditDetailIcon';
import EditDetailNft from './EditDetailNft';
import EditDetailToken from './EditDetailToken';

const DetailTools: FC[] = [
	EditDetailCard,
	EditDetailToken,
	EditDetailNft,
	EditDetailIcon,
];

export default DetailTools;
