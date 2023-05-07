import { Search } from '@walless/icons';
import { Stack } from '@walless/ui';

const SearchBar = () => {
	return (
		<Stack
			alignItems="flex-end"
			backgroundColor="transparent"
			borderRadius={10}
			borderWidth={1}
			borderColor="#364654"
			padding={8}
		>
			<Search size={20} color="#293642" />
		</Stack>
	);
};

export default SearchBar;
