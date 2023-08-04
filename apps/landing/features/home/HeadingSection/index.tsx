import { useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Image, Stack } from '@walless/ui';
import { ContainerStack } from 'components/styled';
import { resources } from 'utils/config';

import PrimaryContent from './PrimaryContent';
import { particles } from './shared';

const HeadingSection = () => {
	const previewImages = Object.values(resources.home.preview);

	const [height, setHeight] = useState(0);
	const [previewImageIndex, setPreviewImageIndex] = useState(0);
	const [previewImage, setPreviewImage] = useState(
		previewImages[previewImageIndex],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setPreviewImageIndex((previewImageIndex + 1) % previewImages.length);
			setPreviewImage(previewImages[previewImageIndex]);
		}, 1500);

		return () => clearInterval(interval);
	}, [previewImageIndex]);

	const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setHeight(nativeEvent.layout.height);
	};

	const particleElement = (
		<Stack fullscreen $md={{ opacity: 0.5 }} $xs={{ opacity: 0.3 }}>
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
				<Image src={previewImage} width={342} height={500} borderRadius={16} />
			</Stack>
		</Stack>
	);

	return (
		<Stack
			height={height}
			minHeight={500}
			marginVertical={64}
			$md={{ marginVertical: 0 }}
		>
			<ContainerStack fullscreen maxWidth={1200}>
				{particleElement}
				{contentElement}
			</ContainerStack>
		</Stack>
	);
};

export default HeadingSection;
