import { type FC, type ReactNode, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Heart } from '@walless/icons';
import { HomeLayout } from 'components/layouts';
import LayoutDetails from 'features/LayoutDetails';
import {
	type LayoutProps,
	defiList,
	gamesList,
} from 'features/LayoutSection/internal';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
	id: string;
	coverImage: string;
	logoImage: string;
	title: string;
	description: string;
	loveCount: number;
	activeCount: number;
	Screenshots?: ReactNode;
	Information?: ReactNode;
	Comments?: ReactNode;
}

const Layout: FC<Props> = () => {
	const [layout, setLayout] = useState<LayoutProps | null>(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		const selectedLayout =
			defiList.find((layout) => layout.id === id) ??
			gamesList.find((layout) => layout.id === id);
		if (selectedLayout) {
			setLayout(selectedLayout);
		}
	}, [id]);

	return (
		<HomeLayout>
			{!layout ? (
				<Text>loading</Text>
			) : (
				<View style={styles.layoutContainer}>
					<View style={styles.coverContainer}>
						<Image src={layout?.coverImage} alt={layout?.title} fill={true} />
					</View>

					<View style={styles.bodyContainer}>
						<View style={styles.blockContainer}>
							<LayoutDetails
								style={styles.informationContainer}
								layout={layout}
								logoSize={80}
							/>
						</View>

						<View style={styles.blockContainer}>
							<Button style={styles.button} title="Get early access" />
							<Button style={styles.button} title="Share layout" />
						</View>
					</View>
				</View>
			)}
		</HomeLayout>
	);
};

export default Layout;

const styles = StyleSheet.create({
	container: {},
	layoutContainer: {
		width: 'fit-content',
		justifyContent: 'center',
		alignItems: 'center',
	},
	coverContainer: {
		width: 1200,
		height: 600,
	},
	bodyContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 40,
		gap: 200,
	},
	informationContainer: {
		alignItems: 'flex-start',
		marginTop: -40,
	},
	blockContainer: {
		flex: 1,
	},
	button: {
		marginLeft: 'auto',
	},
});
