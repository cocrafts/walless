import { Image, StyleSheet } from 'react-native';
import { Button, View } from '@walless/gui';
import NavigationItem from 'components/NavigationItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { resources } from 'utils/config';
import { sharedStyles } from 'utils/style';

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
	const router = useRouter();

	const isLayoutDetail = router.pathname.includes('/layouts/');

	return (
		<View horizontal style={styles.container}>
			<Link href="/">
				<Image source={resources.walless.horizontalLogo} style={styles.logo} />
			</Link>
			<View horizontal style={styles.groupItem}>
				{navigationItems.map((item) => (
					<NavigationItem
						key={item.href}
						title={item.title}
						href={item.href}
						isActive={
							router.pathname === item.href ||
							(isLayoutDetail && item.href === '/')
						}
					/>
				))}
			</View>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.button}
					title="Join waitlist"
					titleStyle={styles.buttonTitle}
				/>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		...sharedStyles.container,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 40,
		paddingVertical: 20,
	},
	logo: {
		height: 20,
		aspectRatio: 128 / 15,
	},
	groupItem: {
		justifyContent: 'center',
	},
	buttonContainer: {
		width: 256,
		alignItems: 'flex-end',
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
