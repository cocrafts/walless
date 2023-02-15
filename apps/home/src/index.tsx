import { FC } from 'react';
import { Provider as UIProvider } from '@metacraft/ui';
import RootStack from 'stacks/Root';
import { homeTheme } from 'utils/style';

export const App: FC = () => {
	return (
		<UIProvider theme={homeTheme}>
			<RootStack />
		</UIProvider>
	);
};

export default App;
