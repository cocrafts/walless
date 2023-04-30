import { useRef, useState } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';
import { Button, Input, Stack, Text } from '@walless/ui';

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

export enum LayoutCardComponent {
	coverImage,
	avatar,
	projectName,
	description,
}

const LayoutInStore = () => {
	const [activeComponent, setActiveComponent] =
		useState<LayoutCardComponent | null>(null);
	const [layoutCardProps, setLayoutCardProps] = useState<LayoutCardProps>(
		initialLayoutCardProps,
	);
	const wrapperRef = useRef(null);

	const handleMouseEnter = (index: number) => {
		setActiveComponent(index);
	};

	const handleMouseLeave = () => {
		setActiveComponent(null);
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
					onMouseEnter={() => handleMouseEnter(LayoutCardComponent.coverImage)}
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
					onMouseEnter={() => handleMouseEnter(LayoutCardComponent.avatar)}
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
					onMouseEnter={() => handleMouseEnter(LayoutCardComponent.projectName)}
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
					onMouseEnter={() => handleMouseEnter(LayoutCardComponent.description)}
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

			<Stack ref={wrapperRef}>
				<LayoutCard item={layoutCardProps} activeComponent={activeComponent} />
			</Stack>

			<Button
				width={120}
				height={40}
				onPress={() =>
					exportComponentAsPNG(wrapperRef, {
						fileName: 'Walless-custom-layout',
						html2CanvasOptions: {
							backgroundColor: null,
						},
					})
				}
			>
				Save Image
			</Button>
		</Stack>
	);
};

export default LayoutInStore;
