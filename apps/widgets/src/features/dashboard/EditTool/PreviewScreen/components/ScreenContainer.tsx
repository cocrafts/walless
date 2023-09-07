import type { FC, ReactNode } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { Compass } from '@walless/icons';
import { appState } from 'state/tool';
import { useSnapshot } from 'valtio';

interface Props {
	children: ReactNode;
}

const ScreenContainer: FC<Props> = ({ children }) => {
	const { tools } = useSnapshot(appState);

	return (
		<View style={styles.container}>
			<View style={styles.sideBar}>
				<Image
					style={{
						width: 36,
						height: 36,
						borderRadius: 1000,
					}}
					source={{ uri: tools.project.logo }}
				/>

				<View
					style={{
						width: 36,
						height: 36,
						borderRadius: 10,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#243F56',
					}}
				>
					<Compass size={20} color="#0694D3" />
				</View>

				<Image style={styles.avatar} source={{ uri: '/img/avatar.png' }} />
			</View>

			<View style={styles.childrenContainer}>{children}</View>
		</View>
	);
};

export default ScreenContainer;

const styles = StyleSheet.create({
	container: {
		width: 442,
		height: 650,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#364654',
		backgroundColor: '#0A1117',
		flexDirection: 'row',
	},
	sideBar: {
		width: 60,
		paddingVertical: 20,
		borderRightWidth: 1,
		borderColor: '#364654',
		alignItems: 'center',
		gap: 10,
	},
	avatar: {
		width: 36,
		height: 36,
		borderRadius: 10,
		marginTop: 'auto',
	},
	childrenContainer: {
		flex: 1,
		padding: 20,
		gap: 20,
	},
});
