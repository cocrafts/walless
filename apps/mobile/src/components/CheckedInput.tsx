import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { InputProps } from '@walless/gui';
import { Input } from '@walless/gui';

type Props = {
	checkFunction: (value?: string) => string | undefined;
} & InputProps;

const CheckedInput: FC<Props> = ({ value, checkFunction, ...inputProps }) => {
	const [errorText, setErrorText] = useState<string>();

	const handlerBlur = () => {
		setErrorText(checkFunction(value));
	};

	return (
		<View style={styles.container}>
			<Input
				{...inputProps}
				value={value}
				importantStyle={!!errorText && styles.errorInputStyle}
				onBlur={handlerBlur}
			/>
			<View style={styles.bottomBox}>
				{!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
			</View>
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
	maxButton: {
		paddingHorizontal: 8,
		paddingVertical: 5,
		backgroundColor: '#1E2830',
		borderRadius: 6,
		marginRight: 6,
	},
	titleMaxButton: {
		fontSize: 10,
		lineHeight: 12,
		fontWeight: '500',
	},
	bottomBox: {
		height: 14,
		marginTop: 1,
		marginRight: 'auto',
		paddingLeft: 6,
	},
	errorText: {
		fontSize: 13,
		color: '#AE3939',
	},
	errorInputStyle: {
		borderColor: '#AE3939',
		color: '#AE3939',
	},
});
