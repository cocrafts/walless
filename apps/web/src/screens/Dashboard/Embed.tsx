import type { FC } from 'react';
import { WidgetFeature } from '@walless/app';
import { useParams } from 'utils/hooks';

export const Embed: FC = () => {
	const { id } = useParams<'id'>();

	return <WidgetFeature id={id as string} />;
};

export default Embed;
