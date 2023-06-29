import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@walless/gui';
import { HomeLayout } from 'components/layouts';
import { type LayoutProps, defiList, gamesList } from 'features/internal';
import LayoutDetails from 'features/LayoutDetails';
import { useRouter } from 'next/router';

const Layout = () => {
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
				<LayoutDetails style={styles.layoutContainer} layout={layout} />
			)}
		</HomeLayout>
	);
};

export default Layout;

const styles = StyleSheet.create({
	container: {},
	layoutContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	coverContainer: {
		width: 1200,
		height: 600,
	},
	bodyContainer: {
		flex: 1,
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 40,
	},
});
