import { type FC, type ReactNode } from 'react';
import { Stack, StackProps, Text } from '@walless/ui';

type Props = StackProps & {
	children?: ReactNode;
	size?: number;
	title?: string;
	color?: string;
	fontSize?: number;
	fontWeight?: string;
};

export const FeatureButton: FC<Props> = ({
	children,
	size = 38,
	title,
	color = '#4e5e6b',
	fontSize = 13,
	fontWeight = '400',
	...stackProps
}) => {
	return (
		<Stack
			alignItems="center"
			cursor="pointer"
			userSelect="none"
			hoverStyle={{ opacity: 0.8 }}
			pressStyle={{ opacity: 0.7 }}
			{...stackProps}
		>
			<Stack
				borderRadius={12}
				width={size}
				height={size}
				gap={8}
				backgroundColor="#0694D3"
				alignItems="center"
				justifyContent="center"
			>
				{children}
			</Stack>
			{title && (
				<Text
					color={color}
					fontSize={fontSize}
					fontWeight={fontWeight}
					marginTop={8}
				>
					{title}
				</Text>
			)}
		</Stack>
	);
};

export default FeatureButton;
