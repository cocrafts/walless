import type { FC } from 'react';
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
		<Button>
			<Plus color="#566674" size={18} />
			<View>
				<input
					type="file"
					accept="image/png,image/jpeg,image/jpg,image/gif"
					onChange={(e) => handleChangeImage(e, handleGetImage)}
					style={{
						width: width,
						height: height,
						opacity: 0,
					}}
				/>
			</View>
		</Button>
	);
};

export default UploadImage;
