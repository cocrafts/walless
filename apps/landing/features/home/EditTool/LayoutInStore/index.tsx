import { useState } from 'react';
import { Input, Stack, Text } from '@walless/ui';

import LayoutCard from './LayoutCard';

export interface LayoutCardProps {
	coverImage: string;
	avatar: string;
	projectName: string;
	description: string;
}

export const initialLayoutCardProps: LayoutCardProps = {
	coverImage: 'https://picsum.photos/200/300',
	avatar: 'https://picsum.photos/200/300',
	projectName: 'Project Name',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
};

const LayoutInStore = () => {
	const [currentHoverIndex, setCurrentHoverIndex] = useState<number | null>(
		null,
	);
	const [layoutCardProps, setLayoutCardProps] = useState<LayoutCardProps>(
		initialLayoutCardProps,
	);

	const handleMouseEnter = (index: number) => {
		setCurrentHoverIndex(index);
	};

	const handleMouseLeave = () => {
		setCurrentHoverIndex(null);
	};

	const handleChangeCoverImage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setLayoutCardProps({
				...layoutCardProps,
				coverImage: e.target?.result as string,
			});
		};
		reader.readAsDataURL((event.target.files as FileList)[0] as Blob);
	};

	const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setLayoutCardProps({
				...layoutCardProps,
				avatar: e.target?.result as string,
			});
		};
		reader.readAsDataURL((event.target.files as FileList)[0] as Blob);
	};

	return (
		<Stack
			gap={24}
			$gtMd={{
				flexDirection: 'row',
			}}
		>
			<Stack gap={12}>
				<Stack
					flexDirection="row"
					gap={16}
					onMouseEnter={() => handleMouseEnter(0)}
					onMouseLeave={handleMouseLeave}
				>
					<Text>Set cover image</Text>
					<input
						type="file"
						accept="image/png, image/jpeg"
						onChange={handleChangeCoverImage}
					/>
				</Stack>

				<Stack
					flexDirection="row"
					gap={16}
					onMouseEnter={() => handleMouseEnter(1)}
					onMouseLeave={handleMouseLeave}
				>
					<Text>Set avatar</Text>
					<input
						type="file"
						accept="image/png, image/jpeg"
						onChange={handleChangeAvatar}
					/>
				</Stack>

				<Stack
					flexDirection="row"
					gap={16}
					onMouseEnter={() => handleMouseEnter(2)}
					onMouseLeave={handleMouseLeave}
				>
					<Text>Set project name</Text>
					<Input
						onChangeText={(text) =>
							setLayoutCardProps({
								...layoutCardProps,
								projectName: text,
							})
						}
					/>
				</Stack>

				<Stack
					flexDirection="row"
					gap={16}
					onMouseEnter={() => handleMouseEnter(3)}
					onMouseLeave={handleMouseLeave}
				>
					<Text>Set description</Text>
					<Input
						onChangeText={(text) =>
							setLayoutCardProps({
								...layoutCardProps,
								description: text,
							})
						}
					/>
				</Stack>
			</Stack>

			<LayoutCard
				item={layoutCardProps}
				currentHoverIndex={currentHoverIndex}
			/>
		</Stack>
	);
};

export default LayoutInStore;
