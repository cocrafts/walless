import { StyleSheet } from 'react-native';
import { BulletSeparator } from '@walless/app';
import { Button, Text, View } from '@walless/gui';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { particles } from './components/shared';

const WalletCustomizeSection = () => {
	const router = useRouter();

	const handlePressNewLayout = () => {
		router.push('/dashboard/design-tool');
	};

	return (
		<View>
			<View>
				{particles.map(({ Component, style, size }, index) => {
					return <Component key={index} width={size} style={style} />;
				})}
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.firstBlockContainer}>
					<Text style={styles.headingText}>
						Customize your own wallet layout today
					</Text>
					<BulletSeparator
						noBullet={false}
						bulletWidth={12}
						bulletHeight={6}
						color="#19A3E1"
					/>
					<Text style={styles.subText}>
						Discord servers are organized into topic-based channels where you
						can collaborate
					</Text>
					<Button
						style={styles.button}
						title="Make your layout"
						titleStyle={styles.buttonText}
						onPress={handlePressNewLayout}
					/>
				</View>

				<View style={styles.secondBlockContainer}>
					<Image
						src="/img/edit-tool-preview.png"
						alt="edit tool image"
						width={300}
						height={288}
					/>
				</View>
			</View>
		</View>
	);
};

export default WalletCustomizeSection;

const styles = StyleSheet.create({
	contentContainer: {
		flexDirection: 'row',
		paddingHorizontal: 72,
		paddingVertical: 28,
	},
	secondBlockContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	firstBlockContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingVertical: 20,
		gap: 28,
	},
	headingText: {
		fontSize: 32,
		fontWeight: '600',
		color: '#ffffff',
	},
	subText: {
		width: 360,
		color: '#566674',
	},
	buttonText: {
		fontSize: 18,
		fontWeight: '500',
		color: '#ffffff',
	},
	button: {
		alignSelf: 'flex-start',
		paddingHorizontal: 40,
		paddingVertical: 10,
	},
});
