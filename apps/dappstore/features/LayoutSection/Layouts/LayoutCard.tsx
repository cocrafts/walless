import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { Heart } from '@walless/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { type LayoutProps } from '../internal';

interface Props {
	layout: LayoutProps;
	activeLayoutId?: string | null;
	setIsActiveId?: (id: string | null) => void;
}

const LayoutCard: FC<Props> = ({ layout, activeLayoutId, setIsActiveId }) => {
	const {
		id,
		coverImage,
		logoImage,
		title,
		description,
		loveCount,
		activeCount,
	}: LayoutProps = layout;

	const router = useRouter();

	const handleNavigateToLayoutDetails = () => {
		router.push(`/layouts/${id}`);
	};

	return (
		<Hoverable
			style={
				id === activeLayoutId
					? { ...styles.container, backgroundColor: '#131C24' }
					: styles.container
			}
			onHoverIn={() => setIsActiveId?.(id)}
			onHoverOut={() => setIsActiveId?.(null)}
		>
			<View style={styles.coverContainer}>
				<Image src={coverImage} alt={title} fill={true} />
			</View>

			<View style={styles.bodyContainer}>
				<View style={styles.titleContainer}>
					<Image
						style={styles.logo}
						src={logoImage}
						alt={title}
						width={36}
						height={36}
					/>

					<Text style={styles.title}>{title}</Text>
				</View>

				<Text>{description}</Text>
				<View style={styles.bottomContainer}>
					<View style={styles.bottomContainer}>
						<View style={styles.activityContainer}>
							<Heart colors={['white']} size={8} />
							<Text style={styles.subText}>{loveCount} Love</Text>
						</View>

						<View style={styles.activityContainer}>
							<View style={styles.activeDisplay} />
							<Text style={styles.subText}>{activeCount} Active</Text>
						</View>
					</View>

					{id === activeLayoutId && (
						<Hoverable
							style={styles.detailButton}
							onPress={handleNavigateToLayoutDetails}
							onHoverIn={() => setIsActiveId?.(id)}
						>
							<Text style={styles.detailText}>Details</Text>
						</Hoverable>
					)}
				</View>
			</View>
		</Hoverable>
	);
};

export default LayoutCard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		borderRadius: 12,
	},
	coverContainer: {
		height: 124,
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	title: {
		fontWeight: '600',
		fontSize: 18,
		color: '#ffffff',
	},
	description: {
		color: '#A4B3C1',
	},
	bodyContainer: {
		paddingHorizontal: 8,
		gap: 8,
	},
	logo: {
		marginTop: -16,
	},
	bottomContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 4,
	},
	activityContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	activeDisplay: {
		width: 6,
		height: 6,
		backgroundColor: '#0694D3',
		borderRadius: 4,
	},
	detailButton: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		backgroundColor: '#0694D3',
		borderRadius: 6,
	},
	detailText: {
		fontSize: 12,
		color: '#ffffff',
	},
	subText: {
		margin: 8,
		fontSize: 12,
		color: '#566674',
	},
});
