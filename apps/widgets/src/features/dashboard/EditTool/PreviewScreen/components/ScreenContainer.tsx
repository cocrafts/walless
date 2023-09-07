import type { FC, ReactNode } from 'react';
import { Image, StyleSheet } from 'react-native';
import { dimensionState, View } from '@walless/gui';
import { Compass } from '@walless/icons';
import { appState } from 'state/tool';
import { useSnapshot } from 'valtio';

interface Props {
	children: ReactNode;
}

const ScreenContainer: FC<Props> = ({ children }) => {
	const { responsiveLevel } = useSnapshot(dimensionState);
	const { tools } = useSnapshot(appState);
	const width = [442, 442, 400, 350][responsiveLevel];

	return (
		<View style={[styles.container, { width }]}>
			<View style={styles.sideBar}>
				<Image
					style={{
						...styles.iconStyle,
						borderRadius: 1000,
					}}
					source={{ uri: tools.project.logo }}
				/>

				<View
					style={{
						...styles.iconStyle,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#243F56',
					}}
				>
					<Compass size={[20, 20, 16, 10][responsiveLevel]} color="#0694D3" />
				</View>

				<Image
					style={{ ...styles.iconStyle, marginTop: 'auto' }}
					source={{ uri: '/img/avatar.png' }}
				/>
			</View>

			<View style={styles.childrenContainer}>{children}</View>
		</View>
	);
};

export default ScreenContainer;

const styles = StyleSheet.create({
	container: {
		maxWidth: 442,
		aspectRatio: 442 / 650,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#364654',
		backgroundColor: '#0A1117',
		flexDirection: 'row',
		overflow: 'hidden',
	},
	sideBar: {
		width: '14%',
		maxWidth: 60,
		paddingVertical: 20,
		paddingHorizontal: 8,
		borderRightWidth: 1,
		borderColor: '#364654',
		alignItems: 'center',
		gap: 10,
	},
	iconStyle: {
		width: '100%',
		maxWidth: 36,
		aspectRatio: 1,
		borderRadius: 10,
	},
	childrenContainer: {
		flex: 1,
		padding: 20,
		gap: 20,
	},
});
