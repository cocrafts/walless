import type { FC, ReactNode } from 'react';
import type { TamaguiInternalConfig } from '@tamagui/core';
import { TamaguiProvider } from '@tamagui/core';

interface Props {
	config: TamaguiInternalConfig;
	children?: ReactNode;
	disableInjectCSS?: boolean;
	disableRootThemeClass?: boolean;
	theme?: string;
}

export const GuiProvider: FC<Props> = ({
	config,
	theme,
	children,
	disableInjectCSS,
	disableRootThemeClass,
}) => {
	return (
		<TamaguiProvider
			config={config}
			disableInjectCSS={disableInjectCSS}
			disableRootThemeClass={disableRootThemeClass}
			defaultTheme={theme}
		>
			{children}
		</TamaguiProvider>
	);
};

export default GuiProvider;
