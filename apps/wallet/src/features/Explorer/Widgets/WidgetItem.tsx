import { type FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Heart } from '@walless/icons';

interface WidgetItemProps {
	coverImage: string;
	title: string;
	description: string;
	activeCount: number;
	loveCount: number;
	isAdded: boolean;
	onPress: () => void;
}

const WidgetItem: FC<WidgetItemProps> = ({
	coverImage,
	title,
	description,
	activeCount,
	loveCount,
	isAdded,
	onPress,
}) => {
	return (
		<View style={styles.container}>
			<Image style={styles.coverImage} source={{ uri: coverImage }} />
			<View style={styles.middlePart}>
				<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
					{title}
				</Text>
				<Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
					{description}
				</Text>
				<View style={styles.loveAndActiveContainer}>
					<View style={styles.loveAndActiveDisplay}>
						<Heart colors={['#D93737', '#D93737']} size={12} />
						<Text style={styles.loveText}>{loveCount}</Text>
					</View>
					<View style={styles.loveAndActiveDisplay}>
						<View style={styles.activeIcon} />
						<Text style={styles.activeText}>{activeCount}</Text>
					</View>
				</View>
			</View>
			<Button
				style={isAdded ? styles.openBtn : styles.addBtn}
				onPress={onPress}
			>
				<Text style={isAdded ? styles.openBtnText : styles.addBtnText}>
					{isAdded ? 'OPEN' : 'ADD'}
				</Text>
			</Button>
		</View>
	);
};

export default WidgetItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 8,
		backgroundColor: '#23313C',
		padding: 8,
		borderRadius: 8,
	},
	coverImage: {
		width: 75,
		height: 50,
		borderRadius: 6,
	},
	middlePart: {
		flex: 1,
		gap: 4,
	},
	title: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '500',
	},
	loveAndActiveContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	loveAndActiveDisplay: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	activeIcon: {
		width: 10,
		height: 10,
		borderRadius: 6,
		backgroundColor: '#37B681',
	},
	activeText: {
		color: '#37B681',
		fontSize: 10,
	},
	loveText: {
		color: '#4E5C69',
		fontSize: 10,
	},
	addBtn: {
		alignSelf: 'center',
		backgroundColor: '#19A3E1',
		borderRadius: 6,
		width: 62,
		height: 28,
	},
	openBtn: {
		alignSelf: 'center',
		backgroundColor: '#2D3C4A',
		borderRadius: 6,
		width: 62,
		height: 28,
	},
	openBtnText: {
		color: '#19A3E1',
		fontSize: 12,
	},
	addBtnText: {
		color: '#ffffff',
		fontSize: 12,
	},
	description: {
		color: '#798997',
		fontSize: 12,
	},
});
