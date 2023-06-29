import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import Image from 'next/image';

interface Props {
	imageList: string[];
}

const ScreenshotsTab: FC<Props> = ({ imageList }) => {
	return (
		<View style={styles.container}>
			{imageList.map((image, index) => (
				<Image
					key={index}
					src={image}
					alt="screenshot"
					width={260}
					height={470}
				/>
			))}
		</View>
	);
};

export default ScreenshotsTab;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 16,
	},
});
