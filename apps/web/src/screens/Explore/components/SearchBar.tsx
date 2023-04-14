import { FC, useRef } from 'react';
import { Input, Stack } from '@walless/gui';
import { Search } from '@walless/icons';

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
			flexDirection="row"
			alignItems="center"
			backgroundColor="#0E141A"
			borderRadius={10}
			paddingHorizontal={10}
		>
			<Input
				placeholder="Explore exciting project"
				placeholderTextColor="#566674"
				fontSize={15}
				flex={1}
				padding={12}
				paddingRight={8}
				unstyled
			/>
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
