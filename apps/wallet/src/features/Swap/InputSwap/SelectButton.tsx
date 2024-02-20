import type { FC } from 'react';
import { Fragment } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { ChevronDown } from '@walless/icons';
import assets from 'utils/assets';

type Props = {
	symbol?: string;
	logoURI?: string;
	onPress?: () => void;
};

const SelectButton: FC<Props> = ({ symbol, logoURI, onPress }) => {
	const tokenIcon = logoURI ? { uri: logoURI } : assets.misc.unknownToken;

	return (
		<Button style={styles.container} onPress={onPress}>
			{symbol ? (
				<Fragment>
					<Image style={styles.icon} source={tokenIcon} />
					<Text style={styles.text}>{symbol || 'Unknown'}</Text>
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
