import { FC } from 'react';
import { GetProps, styled } from '@tamagui/core';

import { Text } from './styled';

interface Props {
	title?: string;
	onPress?: () => void;
}

export const HyperLink: FC<Props & HyperLinkProps> = ({
	title,
	onPress,
	...props
}) => {
	return (
		<HyperLinkFrame {...props} onPress={onPress}>
			{title || 'Link'}
		</HyperLinkFrame>
	);
};

export default HyperLink;

export const HyperLinkFrame = styled(Text, {
	color: '#0694D3',
	hoverStyle: {
		cursor: 'pointer',
		textDecorationLine: 'underline',
	},
	focusStyle: {
		textDecorationLine: 'underline',
	},
});

type HyperLinkProps = GetProps<typeof HyperLinkFrame>;
