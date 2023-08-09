import type { FC } from 'react';
import { View } from '@walless/gui';

const Separator: FC = () => {
	return (
		<View
			style={{
				backgroundColor: '#131C24',
				paddingHorizontal: 12,
			}}
		>
			<View
				style={{
					width: '100%',
					height: 1,
					backgroundColor: '#566674',
					opacity: 0.4,
				}}
			/>
		</View>
	);
};

export default Separator;
