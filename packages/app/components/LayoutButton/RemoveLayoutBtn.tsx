import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { ModalConfigs } from '@walless/gui';
import { Hoverable, Text, View } from '@walless/gui';

const RemoveLayoutBtn: FC<{
	config: ModalConfigs;
	onRemove: () => void;
}> = ({ onRemove }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Hoverable
			style={styles.button}
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
			hoverOpacity={1}
			onPress={onRemove}
		>
			<View style={isHovered ? styles.hoverIn : styles.hoverOut}>
				<Text>Remove layout</Text>
			</View>
		</Hoverable>
	);
};
const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1F2A34',
		width: 284,
		height: 48,
		borderRadius: 16,
	},
	hoverIn: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingHorizontal: 16,
		backgroundColor: '#0694D3',
		width: 274,
		height: 40,
		borderRadius: 12,
	},
	hoverOut: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingHorizontal: 16,
		backgroundColor: 'transparent',
		width: 274,
		height: 40,
		borderRadius: 12,
	},
	text: {
		color: '#FFFFFF',
		fontSize: 14,
		fontWeight: '500',
	},
});
export default RemoveLayoutBtn;
