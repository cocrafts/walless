import { useCallback, useRef, useState } from 'react';
import { Button, Input, Stack, Text } from '@walless/ui';
import { toPng } from 'html-to-image';
import Link from 'next/link';
import { appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';

import { handleChangeImage } from '../utils';

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
	const { counter } = useSnapshot(appState);
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

	const handleChangeCoverImage = (url: string) => {
		setLayoutCardProps({
			...layoutCardProps,
			coverImage: url,
		});
	};

	const handleChangeAvatar = (url: string) => {
		setLayoutCardProps({
			...layoutCardProps,
			avatar: url,
		});
	};

	const handleExportImage = useCallback(() => {
		if (wrapperRef.current === null) {
			return;
		}

		toPng(wrapperRef.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = 'walless-custom-layout-card.png';
				link.href = dataUrl;
				link.click();
			})
			.catch((err) => {
				console.error(err);
			});
	}, [wrapperRef]);

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
					<Text>Set cover image (png, jpg, jpeg, {counter})</Text>
					<input
						type="file"
						accept="image/png, image/jpg, image/jpeg"
						onChange={(e) => handleChangeImage(e, handleChangeCoverImage)}
					/>
				</Stack>

				<Stack
					flexDirection="row"
					gap={16}
					onMouseEnter={() => handleMouseEnter(LayoutCardComponent.avatar)}
					onMouseLeave={handleMouseLeave}
				>
					<Text>Set avatar (png, jpg, jpeg)</Text>
					<input
						type="file"
						accept="image/png, image/jpeg"
						onChange={(e) => handleChangeImage(e, handleChangeAvatar)}
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

			<Stack alignItems="center" gap={24}>
				<Stack ref={wrapperRef}>
					<LayoutCard
						item={layoutCardProps}
						activeComponent={activeComponent}
					/>
				</Stack>

				<Stack flexDirection="row" gap={12}>
					<Button onPress={handleExportImage}>
						<Text>Save as Image</Text>
					</Button>

					<Button>
						<Link
							href="https://twitter.com/intent/tweet?text=I%20created%20my%20custom%20layout%20card%20with%20Walless%20and%20it%20looks%20awesome!%20Check%20it%20out%20here:%20https://walless.io"
							target="_blank"
						>
							<Text>Tweet</Text>
						</Link>
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default LayoutInStore;
