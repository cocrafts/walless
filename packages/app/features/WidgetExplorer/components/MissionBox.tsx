import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { Copy, InfoIcon, MissionBackground } from '@walless/icons';

import type { MissionBoxType } from '../internal';
import { missionBoxWidth } from '../shared';

export const MissionBox: FC<MissionBoxType & { idx: number }> = ({
	title,
	colors,
	idx,
}) => {
	return (
		<View style={styles.container}>
			<MissionBackground size={missionBoxWidth} colors={colors} id={idx} />
			<View style={styles.contentContainer}>
				<View horizontal style={{ justifyContent: 'space-between' }}>
					<Hoverable style={styles.iconButton}>
						<Copy color={'#19232c'} size={14} />
					</Hoverable>
					<Hoverable>
						<InfoIcon size={14} />
					</Hoverable>
				</View>
				<Text style={styles.title} selectable={false}>
					{title}
				</Text>
				<Hoverable style={styles.claimButton}>
					<Text style={styles.buttonText}>Claim</Text>
				</Hoverable>
			</View>
		</View>
	);
};

export default MissionBox;

const styles = StyleSheet.create({
	container: {
		marginRight: 10,
	},
	contentContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		padding: 10,
		justifyContent: 'space-between',
	},
	iconButton: {
		width: 26,
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,
		backgroundColor: '#ffffff',
	},
	title: {
		fontSize: 15,
		fontWeight: '500',
		color: '#ffffff',
	},
	claimButton: {
		paddingHorizontal: 12,
		paddingVertical: 7,
		maxWidth: 65,
		borderRadius: 10,
		backgroundColor: '#ffffff',
		alignItems: 'center',
	},
	buttonText: {
		color: '#19232c',
		fontWeight: '500',
	},
});
