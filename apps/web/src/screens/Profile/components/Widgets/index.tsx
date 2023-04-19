import { Setting } from '@walless/icons';
import { Stack } from '@walless/ui';
import { router } from 'utils/routing';

import WidgetButton from './WidgetButton';

const Widgets = () => {
	const handleClickSetting = () => {
		router.navigate('/setting');
	};

	return (
		<Stack flexDirection="row" gap={10}>
			<WidgetButton onClick={handleClickSetting}>
				<Setting size={14} color="white" />
			</WidgetButton>
		</Stack>
	);
};

export default Widgets;
