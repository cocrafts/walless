import { FC } from 'react';
import { TamaguiInternalConfig } from '@tamagui/core';
import { PinUnlockFeature } from '@walless/app';
import { GuiProvider, Stack } from '@walless/ui';

interface Props {
	tamaguiConfig: TamaguiInternalConfig;
}

export const AppContainer: FC<Props> = ({ tamaguiConfig }) => {
	const handlePinChange = (pin: string, isCompleted?: boolean) => {
		if (isCompleted) {
			console.log(pin, '<<---');
		}
	};

	return (
		<GuiProvider config={tamaguiConfig} theme="dark">
			<Stack
				flex={1}
				backgroundColor="$primary"
				alignItems="center"
				justifyContent="center"
			>
				<Stack
					width={410}
					height={600}
					borderRadius={12}
					backgroundColor="#19232c"
					overflow="hidden"
				>
					<PinUnlockFeature onPinChange={handlePinChange} />
				</Stack>
			</Stack>
		</GuiProvider>
	);
};

export default AppContainer;
