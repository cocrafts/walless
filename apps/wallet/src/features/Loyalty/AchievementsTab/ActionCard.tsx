import type { FC } from 'react';
import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import type { Action, ActionMetadata } from '@walless/graphql';
import { ActionCategory } from '@walless/graphql';
import { Button } from '@walless/gui';

import {
	extractDataFromMetadata,
	getIconByType,
	navigateInternalByCta,
} from './internal';

interface Props {
	style?: ViewStyle;
	action: Action;
	isPerformed: boolean;
}

const ActionCard: FC<Props> = ({ style, action, isPerformed }) => {
	const { name, desc, icon, ctaText, ctaType, cta } = useMemo(() => {
		return extractDataFromMetadata(action.metadata as ActionMetadata[]);
	}, [action]);

	const FallbackIcon = getIconByType(action.type || '');

	const handleNavigate = () => {
		if (ctaType === 'internal') {
			navigateInternalByCta(cta);
		} else {
			Linking.openURL(cta);
		}
	};

	return (
		<View style={[styles.container, style]}>
			<View style={styles.leftContainer}>
				{icon ? (
					<Image source={{ uri: icon }} style={styles.image} />
				) : (
					FallbackIcon
				)}
				<View>
					<View>
						<Text style={styles.nameText}>{name}</Text>
						{isPerformed && <Text>Performed</Text>}
					</View>
					{action.category === ActionCategory.Milestone ||
					action.category === ActionCategory.Streak ? (
						<View />
					) : (
						<Text>{desc}</Text>
					)}
				</View>
			</View>

			<View style={styles.rightContainer}>
				<Text style={styles.pointText}>{action.points} points</Text>
				<Button
					style={styles.ctaButton}
					title={ctaText || 'Go'}
					titleStyle={styles.pointText}
					onPress={handleNavigate}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#29323A',
		padding: 16,
		borderRadius: 10,
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	image: {
		width: 24,
		height: 24,
		borderRadius: 4,
	},
	nameText: {
		fontSize: 11,
		fontWeight: '500',
		color: 'white',
	},
	rightContainer: {
		alignItems: 'center',
		gap: 4,
	},
	pointText: {
		fontSize: 10,
		color: 'white',
	},
	ctaButton: {
		width: 64,
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 0,
	},
});

export default ActionCard;
