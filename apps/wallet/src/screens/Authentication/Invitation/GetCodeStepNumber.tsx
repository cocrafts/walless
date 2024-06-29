import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface GetCodeStepNumberProps {
	number: number;
}

const GetCodeStepNumber: FC<GetCodeStepNumberProps> = ({ number }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{number}</Text>
		</View>
	);
};

export default GetCodeStepNumber;

const styles = StyleSheet.create({
	container: {
		width: 28,
		height: 28,
		borderRadius: 14,
		borderColor: '#ffffff',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#ffffff',
		fontSize: 12,
		fontWeight: '500',
	},
});
