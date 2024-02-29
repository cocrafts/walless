import type { ReactNode, Ref } from 'react';
import { forwardRef, useContext } from 'react';
import type { ScrollViewProps } from 'react-native';
import { I18nManager, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DrawerPositionContext from '../utils/DrawerPositionContext';

type Props = ScrollViewProps & {
	children: ReactNode;
};

function DrawerContentScrollView(
	{ contentContainerStyle, style, children, ...rest }: Props,
	ref?: Ref<ScrollView>,
) {
	const drawerPosition = useContext(DrawerPositionContext);
	const insets = useSafeAreaInsets();

	const isRight = I18nManager.getConstants().isRTL
		? drawerPosition === 'left'
		: drawerPosition === 'right';

	return (
		<ScrollView
			{...rest}
			ref={ref}
			contentContainerStyle={[
				{
					paddingTop: insets.top + 4,
					paddingStart: !isRight ? insets.left : 0,
					paddingEnd: isRight ? insets.right : 0,
				},
				contentContainerStyle,
			]}
			style={[styles.container, style]}
		>
			{children}
		</ScrollView>
	);
}

export default forwardRef(DrawerContentScrollView);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
