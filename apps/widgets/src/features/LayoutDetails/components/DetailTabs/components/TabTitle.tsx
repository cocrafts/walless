import { type FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@walless/gui';

interface Props {
	title: string;
	activeTab: string;
	setActiveTab: (title: string) => void;
}

const TabTitle: FC<Props> = ({ title, activeTab, setActiveTab }) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => setActiveTab(title)}
		>
			<Text
				style={
					activeTab === title
						? { ...styles.title, color: '#0694D3' }
						: styles.title
				}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default TabTitle;

const styles = StyleSheet.create({
	container: {
		// minWidth: 180,
		minHeight: 28,
	},
	title: {
		color: '#566674',
		fontSize: 18,
		fontWeight: '500',
	},
});
