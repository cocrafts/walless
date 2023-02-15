import { FC } from 'react';
import { Provider as UIProvider } from '@metacraft/ui';
import RootStack from 'stacks/Root';

export const App: FC = () => {
	return (
		<UIProvider>
			<RootStack />
		</UIProvider>
	);
};

export default App;
