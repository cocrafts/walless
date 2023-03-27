import { FC } from 'react';
import { modalActions, Stack, Text } from '@walless/wui';

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

	return (
		<Stack flex={1} alignItems="center" justifyContent="center">
			<Stack
				style={{ backgroundColor: 'red' }}
				cursor="pointer"
				onPress={showModal}
			>
				<Text>Hmm</Text>
			</Stack>
		</Stack>
	);
};

export default Explore;
