import { type FC } from 'react';
import { Stack } from '@walless/ui';

import SkeletonRect from './SkeletonRect';

const SkeletonLayoutCard: FC = () => {
	const width = 332;

	return (
		<Stack
			width={width}
			borderColor="#364654"
			borderWidth={1}
			borderRadius={12}
		>
			<Stack
				backgroundColor="#141C25"
				height={133}
				borderBottomWidth={1}
				borderColor="#364654"
				borderTopLeftRadius={12}
				borderTopRightRadius={12}
			/>

			<Stack
				marginBottom={20}
				marginTop={-20}
				paddingHorizontal={12}
				paddingVertical={5}
				display="flex"
				justifyContent="flex-end"
				gap={8}
			>
				<Stack
					backgroundColor="#0A0E13"
					width={32}
					height={32}
					borderRadius={8}
					borderWidth={1}
					borderColor="#364654"
				/>

				<Stack flexDirection="row" gap={4}>
					<SkeletonRect width={30} height={8} />
					<SkeletonRect width={8} height={8} />
				</Stack>

				<SkeletonRect width="100%" height={8} />

				<SkeletonRect width="100%" height={8} />

				<SkeletonRect width="100%" height={8} />
			</Stack>
		</Stack>
	);
};

export default SkeletonLayoutCard;
