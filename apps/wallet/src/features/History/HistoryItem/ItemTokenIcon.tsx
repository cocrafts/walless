import type { FC } from 'react';
import { Fragment } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import {
	ArrowBottomRight,
	ArrowTopRight,
	QuestionMark,
	Swap,
} from '@walless/icons';
import type { IconProps } from '@walless/icons/components/types';

interface Props {
	type: string;
	status: string;
	icon: ImageSourcePropType;
	isCollectible?: boolean;
}

export const ItemTokenIcon: FC<Props> = ({
	type,
	icon,
	isCollectible = false,
	status,
}) => {
	let color = '#ffffff';
	let Icon: FC<IconProps> = ArrowTopRight;

	if (type === 'Sent') {
		if (status === 'Failed') {
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
			{type === 'Swap' ? (
				<View style={styles.wrapIcon}>
					<Swap />
				</View>
			) : type === 'Unknown' ? (
				<View style={styles.wrapIcon}>
					<QuestionMark size={28} />
				</View>
			) : (
				<Fragment>
					<Image style={tokenIconStyle} source={icon} />

					<View style={styles.iconContainer}>
						<Icon size={14} color={color} />
					</View>
				</Fragment>
			)}
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
	wrapIcon: {
		width: 40,
		paddingRight: 8,
		alignItems: 'center',
	},
});
