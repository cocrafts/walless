import type { FC } from 'react';
import { Button, Stack } from '@walless/ui';

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
			<Button
				backgroundColor="transparent"
				padding={0}
				onPress={() => setIsTokensTab(true)}
			>
				<Tab name="Tokens" isActive={isTokensTab} />
			</Button>

			<Stack width={1} height={24} backgroundColor="#56667466" />

			<Button
				backgroundColor="transparent"
				padding={0}
				onPress={() => setIsTokensTab(false)}
			>
				<Tab name="Collectibles" isActive={!isTokensTab} />
			</Button>
		</Stack>
	);
};

export default TabBar;
