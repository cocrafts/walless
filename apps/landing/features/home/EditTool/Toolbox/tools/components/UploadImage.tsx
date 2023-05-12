import { type FC } from 'react';
import { Plus } from '@walless/icons';
import { Button, Stack } from '@walless/ui';
import { handleChangeImage } from 'features/home/EditTool/helpers';

interface Props {
	width: number;
	height: number;
	handleGetImage: (image: string) => void;
}

const UploadImage: FC<Props> = ({ width, height, handleGetImage }) => {
	return (
		<Button
			width={width}
			height={height}
			backgroundColor="#19232C"
			padding={0}
			borderWidth={1}
			borderColor="#566674"
			borderStyle="dashed"
			borderRadius={5}
			justifyContent="center"
			alignItems="center"
		>
			<Plus color="#566674" size={18} />
			<Stack position="absolute">
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
			</Stack>
		</Button>
	);
};

export default UploadImage;
