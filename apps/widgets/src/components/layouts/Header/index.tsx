import { Image, StyleSheet } from 'react-native';
import { Button, dimensionState, View } from '@walless/gui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { resources } from 'utils/config';
import { sharedStyles } from 'utils/style';
import { useSnapshot } from 'valtio';

import NavigationItem from './Item';

export interface NavigationItemProps {
	title: string;
	href: string;
}

export const navigationItems: NavigationItemProps[] = [
	{
		title: 'Explore',
		href: '/',
	},
	{
		title: 'Design Tool',
		href: '/design',
	},
];

export const Header = () => {
	const { responsiveLevel } = useSnapshot(dimensionState);
	const router = useRouter();

	const isLayoutDetail = router.pathname.includes('/layouts/');

	return (
		<View horizontal style={styles.container}>
			<Link href="/">
				<Image source={resources.walless.horizontalLogo} style={styles.logo} />
			</Link>
			<View horizontal style={styles.groupItem}>
				{responsiveLevel < 2 &&
					navigationItems.map((item) => (
						<NavigationItem
							key={item.href}
							item={item}
							isActive={
								router.pathname === item.href ||
								(isLayoutDetail && item.href === '/')
							}
						/>
					))}
			</View>
			<Button
				style={styles.button}
				title="Join waitlist"
				titleStyle={styles.buttonTitle}
			/>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		...sharedStyles.container,
		maxWidth: 1200,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	logo: {
		height: 20,
		aspectRatio: 128 / 15,
	},
	groupItem: {
		justifyContent: 'center',
	},
	button: {
		paddingHorizontal: 30,
		paddingVertical: 10,
		borderRadius: 12,
	},
	buttonTitle: {
		fontWeight: '500',
		fontSize: 16,
	},
});
