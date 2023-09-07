import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from '@walless/gui';
import { Plus } from '@walless/icons';
import { handleChangeImage } from 'features/dashboard/EditTool/helpers';

interface Props {
	width: number;
	height: number;
	handleGetImage: (image: string) => void;
}

const UploadImage: FC<Props> = ({ width, height, handleGetImage }) => {
	return (
		<Button style={{ ...styles.button, width, height }}>
			<Plus color="#566674" size={18} />
			<View>
				<input
					type="file"
					accept="image/png,image/jpeg,image/jpg,image/gif"
					onChange={(e) => handleChangeImage(e, handleGetImage)}
					style={{ ...styles.input, width, height }}
				/>
			</View>
		</Button>
	);
};

export default UploadImage;

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#19232C',
		paddingHorizontal: 0,
		paddingVertical: 0,
		borderWidth: 1,
		borderColor: '#566674',
		borderStyle: 'dashed',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		position: 'absolute',
		opacity: 0,
	},
});
