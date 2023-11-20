import { StyleSheet } from 'react-native';

export interface ResponsiveState {
	coverImageSize: number;
	categorySize: number;
	titleSize: number;
	descriptionSize: number;
	containerStyle: object;
	numberOfLines: number;
}

export const getResponsiveState = (size: number): ResponsiveState => {
	const LARGE_SIZE = 1200;
	const MEDIUM_SIZE = 800;

	if (size && size >= LARGE_SIZE) {
		return {
			coverImageSize: 540,
			categorySize: 20,
			titleSize: 40,
			descriptionSize: 20,
			containerStyle: styles.largeContainer,
			numberOfLines: 5,
		};
	} else if (size && size >= MEDIUM_SIZE) {
		return {
			coverImageSize: 420,
			categorySize: 16,
			titleSize: 20,
			descriptionSize: 16,
			containerStyle: styles.mediumContainer,
			numberOfLines: 4,
		};
	} else {
		return {
			coverImageSize: 270,
			categorySize: 14,
			titleSize: 16,
			descriptionSize: 14,
			containerStyle: styles.smallContainer,
			numberOfLines: 3,
		};
	}
};

const styles = StyleSheet.create({
	largeContainer: {
		padding: 50,
		gap: 50,
	},
	mediumContainer: {
		padding: 40,
		gap: 40,
	},
	smallContainer: {
		padding: 20,
		gap: 20,
	},
});
