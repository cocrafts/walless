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

import PointTag from '../components/PointTag';

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
	totalPoints,
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
				>
					<View style={styles.horizontalContainer}>
						<Image style={styles.icon} source={{ uri: icon }} />
						<Text style={styles.partnerText}>{partner}</Text>
					</View>
				</LinearGradient>
			</ImageBackground>

			<View style={styles.rightContainer}>
				<Text style={styles.descText} numberOfLines={3} ellipsizeMode="tail">
					{desc}
				</Text>
				<PointTag points={totalPoints} />
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
		width: 20,
		height: 20,
		borderColor: 'white',
		borderWidth: 2,
		borderRadius: 4,
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
		padding: 12,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		flex: 1,
	},
	descText: {
		color: '#EBF0F5',
		fontSize: 10,
	},
});
