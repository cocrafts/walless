import { type FC, Fragment } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { ChevronDown } from '@walless/icons';
import type { TokenDocument } from '@walless/store';

type Props = {
	token?: TokenDocument;
	onPress?: () => void;
};

const SelectButton: FC<Props> = ({ token, onPress }) => {
	return (
		<Button style={styles.container} onPress={onPress}>
			{token ? (
				<Fragment>
					<Image
						style={styles.icon}
						source={{ uri: token.metadata?.imageUri }}
					/>
					<Text style={styles.text}>{token.metadata?.name}</Text>
				</Fragment>
			) : (
				<View style={styles.emptyContainer}>
					<Text style={styles.text}>Select token</Text>
				</View>
			)}
			<ChevronDown size={16} color="#566674" />
		</Button>
	);
};

export default SelectButton;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#313F4A',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 6,
		paddingVertical: 6,
		borderRadius: 20,
		alignSelf: 'flex-start',
	},
	icon: {
		height: 26,
		width: 26,
		borderRadius: 13,
	},
	text: {
		fontSize: 16,
		color: '#FFFFFF',
	},
	emptyContainer: {
		height: 26,
		paddingLeft: 10,
		justifyContent: 'center',
	},
});
