import { type FC, type ReactNode, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { modalActions } from '../states/modal';
import { themeActions, ThemeState } from '../states/theme';

import ModalManager from './ModalManager';

interface Props {
	children?: ReactNode;
	theme?: ThemeState;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export const Provider: FC<Props> = ({ children, theme }) => {
	const [ready, setReady] = useState(false);
	const containerRef = useRef<View>(null);

	useEffect(() => {
		modalActions.setContainerRef(containerRef);

		if (theme) {
			themeActions.setTheme(theme);
		}

		setReady(true);
	}, []);

	return (
		<View ref={containerRef} style={styles.container}>
			{ready && children}
			<ModalManager />
		</View>
	);
};

export default Provider;
