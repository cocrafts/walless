import { useEffect, useState } from 'react';
import { Image } from 'react-native';

export const useImageAspectRatio = (imageUri: string) => {
	const [aspectRatio, setAspectRatio] = useState(1);

	useEffect(() => {
		if (!imageUri) return;
		let isCancelled = false;

		Image.getSize(imageUri, (width, height) => {
			if (!isCancelled) {
				setAspectRatio(width / height);
			}
		});

		return () => {
			isCancelled = true;
		};
	}, []);

	return aspectRatio;
};
