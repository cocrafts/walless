import type { FC } from 'react';
import { View } from '@walless/gui';

import SkeletonRect from './SkeletonRect';

const SkeletonLayoutCard: FC = () => {
	return (
		<View>
			<View
				style={{
					backgroundColor: '#141C25',
					height: 133,
					borderBottomWidth: 1,
					borderColor: '#364654',
					borderTopLeftRadius: 12,
					borderTopRightRadius: 12,
				}}
			/>

			<View>
				<View />

				<View>
					<SkeletonRect width={30} height={8} />
					<SkeletonRect width={8} height={8} />
				</View>

				<SkeletonRect width="100%" height={8} />

				<SkeletonRect width="100%" height={8} />

				<SkeletonRect width="100%" height={8} />
			</View>
		</View>
	);
};

export default SkeletonLayoutCard;
