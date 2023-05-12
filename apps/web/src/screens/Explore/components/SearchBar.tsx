import { FC } from 'react';
import { Search } from '@walless/icons';
import { Input, Stack } from '@walless/ui';

interface Props {
	onSearch: (query: string) => void;
}

const SearchBar: FC<Props> = ({ onSearch }) => {
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value);
	};

	return (
		<Stack
			flexDirection="row"
			alignItems="center"
			backgroundColor="#FFFFFF"
			borderRadius={10}
			paddingHorizontal={10}
		>
			<Input
				placeholder="Explore exciting project"
				placeholderTextColor="#566674"
				fontSize={15}
				color={'#000000'}
				flex={1}
				padding={12}
				paddingRight={8}
				unstyled
				onChange={handleSearch}
			/>

			<Stack
				borderWidth={0}
				pressStyle={{
					borderWidth: 0,
					opacity: 0.8,
				}}
			>
				<Search size={17} color="#566674" />
			</Stack>
		</Stack>
	);
};

export default SearchBar;
