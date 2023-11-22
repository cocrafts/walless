import type { FC } from 'react';
import { CollectionFeat } from '@walless/app';
import { useParams } from 'utils/hooks';

export const Collection: FC = () => {
	const { id = '' } = useParams<'id'>();

	return <CollectionFeat id={id} />;
};

export default Collection;
