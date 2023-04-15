import { Stack } from '@walless/gui';
import { Bell, IdCard, Setting } from '@walless/icons';
import { router } from 'utils/routing';

import WidgetButton from './WidgetButton';

const Widgets = () => {
	const handleClickSetting = () => {
		router.navigate('/setting');
	};

	return (
		<Stack display="flex" flexDirection="row" gap={10}>
			<WidgetButton onClick={() => console.log('Clicked')}>
				<IdCard size={14} color="white" />
			</WidgetButton>
			<WidgetButton onClick={() => console.log('Clicked')}>
				<Bell size={14} color="white" />
			</WidgetButton>
			<WidgetButton onClick={handleClickSetting}>
				<Setting size={14} color="white" />
			</WidgetButton>
		</Stack>
	);
};

export default Widgets;
