import { FlatList, StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import { missions } from '../internal';

import MissionItem from './MissionItem';

const Missions = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={missions}
				initialScrollIndex={0}
				renderItem={({ item, index }) => {
					let colors = ['#EC74A2', '#F4B999'];
					if (index % 3 === 1) {
						colors = ['#8253FF', '#D73EFF'];
					} else if (index % 3 === 2) {
						colors = ['#3263FF', '#45CFFF'];
					}

					return (
						<MissionItem
							id={index.toString()}
							title={item.title}
							colors={colors}
							buttonText={item.buttonText}
							onPress={item.onPress}
							url={item.url}
						/>
					);
				}}
				horizontal
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default Missions;

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
		paddingLeft: 16,
	},
});
