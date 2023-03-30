import { FC } from 'react';
import { Button, modalActions, Stack, Text } from '@walless/wui';
import DashboardLayout from 'components/DashboardLayout';
import Link from 'next/link';
import { layoutActions } from 'utils/state/layout';

export const Test: FC = () => {
	return (
		<Stack>
			<Text>Test</Text>
		</Stack>
	);
};

export const Explore = () => {
	const showModal = () => {
		console.log('hmm');
		modalActions.show({
			id: 'ex',
			component: Test,
		});
	};

	const addLayout = (id: string) => {
		layoutActions.add({ id });
	};

	return (
		<Stack flex={1} alignItems="stretch" justifyContent="center">
			<DashboardLayout>
				<Stack
					style={{ backgroundColor: 'red' }}
					cursor="pointer"
					onPress={showModal}
				>
					<Text>Hmm</Text>
				</Stack>

				<Button onPress={() => addLayout('solanaXYklr849kc4j5c')}>
					Solana
				</Button>
				<Button onPress={() => addLayout('underrealm4ch4DSc849')}>
					Under Realm
				</Button>

				<Link href="/login">to Login page</Link>
			</DashboardLayout>
		</Stack>
	);
};

export default Explore;
