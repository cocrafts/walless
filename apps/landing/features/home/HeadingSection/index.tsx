import { useState } from 'react';
import { type LayoutChangeEvent } from 'react-native';
import { Image, Stack } from '@walless/gui';
import { ContainerStack } from 'components/styled';
import { resources } from 'utils/config';

import PrimaryContent from './PrimaryContent';
import { particles } from './shared';

const HeadingSection = () => {
	const [height, setHeight] = useState(0);

	const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setHeight(nativeEvent.layout.height);
	};

	const particleElement = (
		<Stack fullscreen>
			{particles.map(({ Component, style, size }, index) => {
				return <Component key={index} width={size} style={style} />;
			})}
		</Stack>
	);

	const contentElement = (
		<Stack
			horizontal
			onLayout={onLayout}
			flexWrap="wrap"
			alignItems="center"
			justifyContent="center"
		>
			<PrimaryContent />
			<Stack justifyContent="center">
				<Image
					src={resources.home.extensionPreview}
					defaultSource={resources.home.extensionPreview}
					width={342}
					height={500}
				/>
			</Stack>
		</Stack>
	);

	return (
		<Stack height={height} marginVertical={64} $md={{ marginVertical: 0 }}>
			<ContainerStack fullscreen>
				{particleElement}
				{contentElement}
			</ContainerStack>
		</Stack>
	);
};

export default HeadingSection;
