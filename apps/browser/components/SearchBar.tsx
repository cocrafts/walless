import { FC, useRef } from 'react';
import { Search } from '@tamagui/lucide-icons';
import { Button, Input, Stack } from '@walless/wui';

interface Props {
	placeholder?: string;
	onSearch?: (value: string) => void;
}

const SearchBar: FC<Props> = ({ placeholder, onSearch }) => {
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
		>
			<Input
				ref={inputRef}
				flexGrow={1}
				placeholder={placeholder ?? ''}
				placeholderTextColor="#566674"
				color="white"
				borderWidth={0}
				borderRadius={10}
				paddingHorizontal={16}
				paddingVertical={12}
				focusStyle={{
					borderWidth: 0,
				}}
			/>

			<Button
				icon={Search}
				color="#566674"
				borderWidth={0}
				pressStyle={{
					borderWidth: 0,
					opacity: 0.8,
				}}
				onPress={handlePress}
			/>
		</Stack>
	);
};

export default SearchBar;
