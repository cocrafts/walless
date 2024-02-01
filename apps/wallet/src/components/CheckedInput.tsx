import type { FC, ReactNode } from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from '@walless/gui';

type Props = {
	value?: string;
	placeholder?: string;
	keyboardType?: KeyboardTypeOptions;
	errorText?: string;
	suffix?: ReactNode;
	onChangeText?: (value?: string) => void;
	onBlur?: (value?: string) => void;
};

const CheckedInput: FC<Props> = ({
	value,
	placeholder,
	keyboardType,
	suffix,
	errorText,
	onChangeText,
	onBlur,
}) => {
	return (
		<View style={styles.container}>
			<Input
				placeholder={placeholder}
				value={value}
				inputStyle={!!errorText && styles.errorText}
				importantStyle={!!errorText && styles.errorInputContainer}
				keyboardType={keyboardType}
				suffix={suffix}
				onChangeText={onChangeText}
				onBlur={() => onBlur && onBlur(value)}
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
