import type { FC, ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { editToolActions } from 'state/tool';

interface Props {
	children: ReactNode;
	onHover?: () => void;
}

const ToolBox: FC<Props> = ({ children, onHover }) => {
	return (
		<Pressable
			style={styles.container}
			onHoverIn={onHover}
			onHoverOut={editToolActions.unsetTarget}
		>
			{children}
		</Pressable>
	);
};

export default ToolBox;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		gap: 10,
		borderWidth: 1,
		minWidth: 280,
		borderColor: 'rgba(255, 255, 255, 0.12)',
	},
});
