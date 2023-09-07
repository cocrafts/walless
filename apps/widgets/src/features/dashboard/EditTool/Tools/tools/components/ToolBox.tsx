import type { FC, ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { dimensionState } from '@walless/gui';
import { editToolActions } from 'state/tool';
import { useSnapshot } from 'valtio';
interface Props {
	children: ReactNode;
	onHover?: () => void;
}

const ToolBox: FC<Props> = ({ children, onHover }) => {
	const { responsiveLevel } = useSnapshot(dimensionState);
	const minWidth = [280, 500, 400, 280][responsiveLevel];

	return (
		<Pressable
			style={{ ...styles.container, minWidth }}
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
		borderColor: 'rgba(255, 255, 255, 0.12)',
	},
});
