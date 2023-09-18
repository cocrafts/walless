import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@walless/gui';

interface Props {
	title: string;
	currentCategory: string;
	onPress: () => void;
}

const CategoryItem: FC<Props> = ({ title, currentCategory, onPress }) => {
	const checkIsCategoryActive = (
		currentCategory: string,
		chosenCategory: string,
	) => {
		if (!currentCategory && chosenCategory === 'all') {
			return true;
		}
		return currentCategory === chosenCategory;
	};

	const chosenStyle = {
		color: '#ffffff',
	};

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Text
				style={[
					styles.title,
					checkIsCategoryActive(currentCategory, title) && chosenStyle,
				]}
			>
				{title.charAt(0).toUpperCase() + title.slice(1)}
			</Text>
		</TouchableOpacity>
	);
};

export default CategoryItem;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		paddingVertical: 5,
	},
	title: {
		color: '#566674',
	},
});
