import { FC, useRef } from 'react';
import { Search, Stack } from '@walless/gui';

interface Props {
	onSearch: (value: string) => void;
}

const SearchBar: FC<Props> = ({ onSearch }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handlePress = () => {
		onSearch?.(inputRef.current?.value ?? '');
	};

	return (
		<Stack
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			backgroundColor="#0E141A"
			width="100%"
			height={40}
			borderRadius={10}
			paddingHorizontal={10}
		>
			<Stack />
			<Stack
				borderWidth={0}
				pressStyle={{
					borderWidth: 0,
					opacity: 0.8,
				}}
				onPress={handlePress}
			>
				<Search size={17} color="#566674" />
			</Stack>
		</Stack>
	);
};

export default SearchBar;
