import { View } from '@walless/gui';
import { Search } from '@walless/icons';

const SearchBar = () => {
	return (
		<View
			style={{
				alignItems: 'flex-end',
				backgroundColor: 'transparent',
				borderRadius: 10,
				borderWidth: 1,
				borderColor: '#364654',
				padding: 8,
			}}
		>
			<Search size={20} color="#293642" />
		</View>
	);
};

export default SearchBar;
