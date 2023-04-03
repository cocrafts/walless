/* eslint-disable */

import { forwardRef } from 'react';
import { Linking } from 'react-native';
import {
	isWeb,
	ReactComponentWithRef,
	styled,
	TamaguiElement,
} from '@tamagui/core';
import { SizableText, SizableTextProps } from '@tamagui/text';

export type AnchorProps = SizableTextProps & {
	href?: string;
	target?: string;
	rel?: string;
};

const AnchorFrame = styled(SizableText, {
	name: 'Anchor',
	tag: 'a',
	accessibilityRole: 'link',
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
