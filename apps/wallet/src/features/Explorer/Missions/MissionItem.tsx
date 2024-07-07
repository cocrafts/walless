import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { Text } from '@walless/gui';
import { Anchor } from '@walless/gui';

interface MissionProps {
	title: string;
	buttonText?: string;
	onPress?: () => void;
	url?: string;
	style?: ViewStyle;
}

const MissionItem: FC<MissionProps> = ({
	title,
	onPress,
	url,
	buttonText = 'Claim',
	style,
}) => {
	return (
		<Animated.View style={[styles.container, style]}>
			<LinearGradient
				style={styles.gradientContainer}
				colors={[
					'rgba(32, 45, 56, 0.75)',
					'rgba(24, 38, 50, 0.2)',
					'rgba(81, 201, 255, 0.05)',
				]}
				start={{ x: 0, y: 1 }}
				end={{ x: 1, y: 0 }}
			>
				<View style={styles.contentWrapper}>
					<View style={styles.textContainer}>
						<Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
							{title}
						</Text>
					</View>

					<Anchor href={url}>
						<TouchableOpacity style={styles.button} onPress={onPress}>
							<Text style={styles.buttonText}>{buttonText}</Text>
						</TouchableOpacity>
					</Anchor>
				</View>
			</LinearGradient>
		</Animated.View>
	);
};

export default MissionItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#202D38',
		width: 120,
		height: 112,
		borderRadius: 12,
		padding: 8,
		gap: 12,
	},
	gradientContainer: {
		height: '100%',
		borderRadius: 12,
		padding: 4,
	},
	contentWrapper: {
		backgroundColor: '#202D38',
		height: '100%',
		borderRadius: 12,
	},
	textContainer: {
		marginTop: 8,
		flex: 1,
		justifyContent: 'center',
	},
	text: {
		color: '#ffffff',
		fontSize: 13,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 12,
	},
	button: {
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 8,
		backgroundColor: '#17A3E1',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-start',
	},
});
