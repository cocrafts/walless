import type { FC, ReactNode, Ref } from 'react';
import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useResponsive } from '@walless/app';
import { modalActions, ModalManager } from '@walless/gui';

interface Props {
	children?: ReactNode;
	containerRef?: Ref<View>;
}

export const AppContainer: FC<Props> = ({ children, containerRef }) => {
	const modalContainerRef = useRef<View>(null);
	const { isMobileResponsive } = useResponsive();
	const wrapperStyle = isMobileResponsive
		? styles.wrapper
		: styles.wrappedWrapper;
	const containerStyle = isMobileResponsive
		? styles.container
		: styles.wrappedContainer;

	useEffect(() => modalActions.setContainerRef(modalContainerRef), []);

	return (
		<SafeAreaProvider>
			<View style={wrapperStyle}>
				<View ref={containerRef} style={containerStyle}>
					{children}
					<ModalManager />
				</View>
			</View>
		</SafeAreaProvider>
	);
};

export default AppContainer;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	wrappedWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
	},
	wrappedContainer: {
		width: 420,
		height: 600,
		borderRadius: 8,
		overflow: 'hidden',
	},
});
