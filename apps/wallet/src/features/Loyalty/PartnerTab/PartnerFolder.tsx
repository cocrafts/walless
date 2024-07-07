import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
	style?: ViewStyle;
	partner: string;
	desc: string;
	icon: string;
	thumbnail: string;
	totalPoints: number;
	onPress?: () => void;
}

const PartnerFolder: FC<Props> = ({
	style,
	partner,
	desc,
	icon,
	thumbnail,
	onPress,
}) => {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<ImageBackground
				style={styles.backgroundImage}
				source={{ uri: thumbnail }}
				resizeMode="cover"
			>
				<LinearGradient
					style={styles.gradientBackground}
					colors={['rgba(25, 35, 44, 0.8)', 'rgba(25, 35, 44, 0.9)', '#19232C']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
				/>
			</ImageBackground>

			<View style={styles.rightContainer}>
				<View style={styles.horizontalContainer}>
					<Image style={styles.icon} source={{ uri: icon }} />
					<Text style={styles.partnerText}>{partner}</Text>
				</View>

				<Text style={styles.descText} numberOfLines={2} ellipsizeMode="tail">
					{desc}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default PartnerFolder;

const styles = StyleSheet.create({
	container: {
		height: 112,
		flexDirection: 'row',
		backgroundColor: '#19232C',
		borderRadius: 8,
		overflow: 'hidden',
	},
	backgroundImage: {
		aspectRatio: 1,
	},
	gradientBackground: {
		height: '100%',
		aspectRatio: 1,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	icon: {
		width: 32,
		height: 32,
		borderRadius: 16,
		borderColor: 'white',
		borderWidth: 2,
	},
	horizontalContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	partnerText: {
		color: 'white',
		fontSize: 13,
	},
	rightContainer: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: 12,
		gap: 12,
		flexShrink: 1,
	},
	descText: {
		color: '#EBF0F6',
		fontSize: 13,
	},
});
