import { FC } from 'react';
import { Stack } from '@walless/gui';

import Tab from './Tab';

interface Props {
	isTokensTab: boolean;
	setIsTokensTab: (isTokensTab: boolean) => void;
}

const TabBar: FC<Props> = ({ isTokensTab, setIsTokensTab }) => {
	return (
		<Stack
			display="flex"
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
			gap={4}
			padding={4}
			backgroundColor="#1E2830"
			borderRadius={8}
			width="fit-content"
		>
			<Stack onPress={() => setIsTokensTab(true)}>
				<Tab name="Tokens" isActive={isTokensTab} />
			</Stack>

			<Stack width={1} height={24} backgroundColor="#56667466" />

			<Stack onPress={() => setIsTokensTab(false)}>
				<Tab name="Collectibles" isActive={!isTokensTab} />
			</Stack>
		</Stack>
	);
};

export default TabBar;
