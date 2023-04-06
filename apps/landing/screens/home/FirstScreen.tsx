import React, { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Button, Stack, Text } from '@walless/gui';
import { ContainerStack } from 'components/styled';

const FirstScreen = () => {
	const [height, setHeight] = useState(0);

	const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setHeight(nativeEvent.layout.height);
	};
	return (
		<Stack backgroundColor="red">
			<ContainerStack
				backgroundColor="green"
				height={height}
				opacity={height ? 1 : 0}
			>
				<Stack fullscreen opacity={0.2}>
					<Text>This is SVG Decoration</Text>
				</Stack>
				<Stack
					horizontal
					position="absolute"
					flexWrap="wrap"
					top={0}
					left={0}
					right={0}
					paddingVertical={60}
					paddingHorizontal={120}
					onLayout={onLayout}
				>
					<Stack
						flex={1}
						minWidth={300}
						justifyContent="center"
						paddingVertical={32}
					>
						<Stack horizontal>
							<Stack flex={1}>
								<Text>
									Unveiling an entirely new way to think about wallet, Social
									sign in - Custom layout & skin
								</Text>
							</Stack>
							<Stack horizontal alignItems="flex-start">
								<Button title="Main CTA" />
								<Button title="Main CTA" />
							</Stack>
						</Stack>
						<Text>Walless, the first Web3 sandbox-wallet</Text>
					</Stack>
					<Stack height={200}>
						<Text>Image</Text>
					</Stack>
				</Stack>
			</ContainerStack>
		</Stack>
	);
};

export default FirstScreen;
