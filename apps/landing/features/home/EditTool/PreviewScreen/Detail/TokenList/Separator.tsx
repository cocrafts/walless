import type { FC } from 'react';
import { Stack } from '@walless/ui';

const Separator: FC = () => {
	return (
		<Stack backgroundColor="#131C24" paddingHorizontal={12}>
			<Stack
				width={'100%'}
				height={1}
				backgroundColor={'#566674'}
				opacity={0.4}
			/>
		</Stack>
	);
};

export default Separator;
