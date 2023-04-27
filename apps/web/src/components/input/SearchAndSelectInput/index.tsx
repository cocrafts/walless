import { type FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';
import { Button } from '@walless/ui';

interface Props {
	hello: string;
}

{
	/* <Button
	flexDirection="row"
	justifyContent="space-between"
	alignItems="center"
	backgroundColor={isActive ? '#141B21' : 'transparent'}
	width={320}
	height={40}
	borderRadius={11}
	padding={0}
	paddingHorizontal={16}
	onHoverIn={() => setIsActive(true)}
	onHoverOut={() => setIsActive(false)}
	onPress={onPress}
>
	<IconText icon={icon ?? ''} name={name} />

	{isSelected ? <Check size={12} color="#566674" /> : <Stack />}
</Button>; */
}

export const SearchAndSelectInput: FC<Props> = () => {
	return (
		<View>
			<Text>Hello world</Text>
			<TouchableOpacity style={styles.button}>Hello world</TouchableOpacity>
			<Button>Hello world 2</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 320,
		height: 40,
		borderRadius: 11,
		padding: 0,
		paddingHorizontal: 16,
		backgroundColor: 'gray',
	},
});
