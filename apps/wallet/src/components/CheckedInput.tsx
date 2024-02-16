import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { InputProps } from '@walless/gui';
import { Input } from '@walless/gui';

type Props = {
	errorText: string | null;
} & InputProps;

const CheckedInput: FC<Props> = ({ value, errorText, ...inputProps }) => {
	return (
		<View style={styles.container}>
			<Input
				{...inputProps}
				value={value}
				inputStyle={!!errorText && styles.errorText}
				importantStyle={!!errorText && styles.errorInputContainer}
			/>
			{!!errorText && (
				<View style={styles.bottomBox}>
					<Text style={[styles.errorText, styles.subText]}>{errorText}</Text>
				</View>
			)}
		</View>
	);
};

export default CheckedInput;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 20,
	},
	closeButton: {
		backgroundColor: 'none',
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	balanceText: {
		position: 'absolute',
		top: -16,
		fontSize: 12,
		right: 10,
	},
	bottomBox: {
		marginTop: 4,
		marginRight: 'auto',
		paddingLeft: 6,
	},
	errorInputContainer: {
		borderColor: '#AE3939',
	},
	errorText: {
		color: '#AE3939',
	},
	subText: {
		fontSize: 13,
	},
});
