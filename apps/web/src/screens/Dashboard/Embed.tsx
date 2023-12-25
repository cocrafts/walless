import type { FC } from 'react';
import {
	StackHeader,
	universalActions,
	useResponsive,
	WidgetFeature,
} from '@walless/app';
import { useParams } from 'utils/hooks';

export const Embed: FC = () => {
	const { id } = useParams<'id'>();
	const { isMobileResponsive } = useResponsive();

	return (
		<WidgetFeature
			id={id as string}
			headerComponent={isMobileResponsive ? StackHeader : undefined}
			onToggleDrawer={() => universalActions.toggleDrawer()}
		/>
	);
};

export default Embed;
