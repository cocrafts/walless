import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@walless/gui';
import { Check } from '@walless/icons';
import { ExtensionDocument } from '@walless/store';

interface Props {
	onRemovePress: (item: ExtensionDocument) => void;
}

const RemoveLayoutBtn: FC<Props> = ({ onRemovePress }) => {
	return (
		<Button style={styles.button} onPress={() => onRemovePress}>
			<Check size={24} color="#566674" />
		</Button>
	);
};

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1F2A34',
		width: 30,
		height: 30,
		paddingVertical: 4,
		paddingHorizontal: 4,
		borderRadius: 8,
	},
});

export default RemoveLayoutBtn;
