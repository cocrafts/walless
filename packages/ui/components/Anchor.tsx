/* eslint-disable */

import { forwardRef } from 'react';
import { Linking } from 'react-native';
import {
	isWeb,
	ReactComponentWithRef,
	Text,
	TextProps,
	styled,
	TamaguiElement,
} from '@tamagui/core';

export type AnchorProps = TextProps & {
	href?: string;
	target?: string;
	rel?: string;
};

const AnchorFrame = styled(Text, {
	fontFamily: 'Rubik',
	name: 'Anchor',
	tag: 'a',
	color: '#19A3E1',
	accessibilityRole: 'link',
	textDecorationLine: 'none',
});

export const Anchor: ReactComponentWithRef<AnchorProps, TamaguiElement> =
	AnchorFrame.extractable(
		forwardRef(({ href, target, ...props }, ref) => {
			return (
				<AnchorFrame
					{...props}
					{...(isWeb
						? {
								href,
								target,
						  }
						: {
								onPress: (event) => {
									props.onPress?.(event);
									if (href !== undefined) {
										Linking.openURL(href);
									}
								},
						  })}
					ref={ref as any}
				/>
			);
		}),
	);
