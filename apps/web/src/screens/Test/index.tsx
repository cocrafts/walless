import { Stack } from '@walless/gui';

import InputDropdown from './components/InputDropdown';
import { tokens } from './internal';

const TestScreen = () => {
	return (
		<Stack>
			<InputDropdown
				sourceList={tokens}
				placeholder="Select token"
				numberOfAppearItems={3}
			/>
		</Stack>
	);
};

export default TestScreen;
