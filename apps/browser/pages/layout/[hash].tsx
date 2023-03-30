import React from 'react';
import { Button, Stack, Text } from '@walless/wui';
import DashboardLayout from 'components/DashboardLayout';
import { useRouter } from 'next/router';
import { useSnapshot } from 'utils/hook';
import { layoutActions, layoutProxy } from 'utils/state/layout';

export const Layout: React.FC = () => {
	const router = useRouter();
	const layout = useSnapshot(layoutProxy);
	const { hash } = router.query;
	const { id } = layout[hash as string] || '';

	const onRemovePress = () => layoutActions.remove(id);

	return (
		<DashboardLayout>
			<Stack>
				<Text>Hmmm</Text>
				<Button onPress={onRemovePress}>{id}</Button>
			</Stack>
		</DashboardLayout>
	);
};

export default Layout;
