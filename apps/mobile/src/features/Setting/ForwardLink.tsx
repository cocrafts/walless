import type { FC } from 'react';
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Linking } from 'react-native';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ArrowTopRight } from '@walless/icons';

interface Props {
	link: string;
	title: string;
	icon?: React.ReactNode;
	iconBackground?: string;
}

export const ForwardLink: FC<Props> = ({ title, icon, link }) => {
	const [onHover, setOnHover] = useState(false);
	const hoverStyle: ViewStyle = {
		backgroundColor: '#202D38',
	};

	const handlePress = () => {
		Linking.openURL(link);
	};

	return (
		<Hoverable
			style={[styles.container, onHover && hoverStyle]}
			onHoverIn={() => setOnHover(true)}
			onHoverOut={() => setOnHover(false)}
			onPress={handlePress}
		>
			<View style={styles.titleBlock}>
				{icon && <View style={styles.icon}>{icon}</View>}

				<Text>{title}</Text>
			</View>

			<ArrowTopRight size={16} />
		</Hoverable>
	);
};

export default ForwardLink;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'transparent',
		padding: 12,
		borderRadius: 14,
	},
	titleBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	icon: {
		backgroundColor: '#202D38',
		width: 30,
		height: 30,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
