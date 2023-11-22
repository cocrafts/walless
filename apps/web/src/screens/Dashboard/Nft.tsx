import type { FC } from 'react';
import { CollectibleFeat } from '@walless/app';
import { useParams } from 'utils/hooks';

export const Nft: FC = () => {
	const { id = '' } = useParams<'id'>();

	return <CollectibleFeat id={id} />;
};

export default Nft;
