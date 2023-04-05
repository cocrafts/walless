import { Bell, IdCard, Setting, Stack } from '@walless/gui';

import WidgetButton from './WidgetButton';

const Widgets = () => {
	return (
		<Stack display="flex" flexDirection="row" gap={10}>
			<WidgetButton onClick={() => console.log('Clicked')}>
				<IdCard size={14} color="white" />
			</WidgetButton>
			<WidgetButton onClick={() => console.log('Clicked')}>
				<Bell size={14} color="white" />
			</WidgetButton>
			<WidgetButton onClick={() => console.log('Clicked')}>
				<Setting size={14} color="white" />
			</WidgetButton>
		</Stack>
	);
};

export default Widgets;
