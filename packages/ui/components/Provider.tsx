import { type FC, type ReactNode } from 'react';
import { type TamaguiInternalConfig, TamaguiProvider } from '@tamagui/core';

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
