import type { FC } from 'react';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight } from '@walless/icons';
import type { IconProps } from '@walless/icons/components/types';

interface Props {
	type: 'sent' | 'received';
	status: 'success' | 'pending' | 'failed';
	imageUri?: string;
	isCollectible?: boolean;
}

export const ItemTokenIcon: FC<Props> = ({
	type,
	imageUri = '/img/send-token/unknown-token.jpeg',
	isCollectible = false,
	status,
}) => {
	let color = '#ffffff';
	let Icon: FC<IconProps> = ArrowTopRight;

	if (type === 'sent') {
		if (status === 'failed') {
			color = '#DE4747';
		}
	} else {
		Icon = ArrowBottomRight;
		color = '#2FC879';
	}

	const tokenIconStyle = {
		width: 32,
		height: 32,
		borderRadius: isCollectible ? 8 : 32,
	};

	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: imageUri,
				}}
				style={tokenIconStyle}
			/>
			<View style={styles.iconContainer}>
				<Icon size={14} color={color} />
			</View>
		</View>
	);
};

export default ItemTokenIcon;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 16,
		height: 16,
		borderRadius: 16,
		backgroundColor: '#131C24',
		marginLeft: -8,
		marginBottom: -4,
	},
});
