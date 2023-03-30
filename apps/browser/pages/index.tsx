import { FC } from 'react';
import { Button, modalActions, Stack, Text } from '@walless/wui';
import DashboardLayout from 'components/DashboardLayout';
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

				<Button onPress={() => addLayout('solana')}>Solana</Button>
				<Button onPress={() => addLayout('under realm')}> Under Realm</Button>
			</DashboardLayout>
		</Stack>
	);
};

export default Explore;
