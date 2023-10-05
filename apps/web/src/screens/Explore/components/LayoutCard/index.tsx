import type { FC } from 'react';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { LayoutButton } from '@walless/app';
import RemoveLayoutBtn from '@walless/app/components/LayoutButton/RemoveLayoutBtn';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';
import { Heart, Plus } from '@walless/icons';
import type { WidgetDocument } from '@walless/store';
import { Image, Stack, Text } from '@walless/ui';
import type { LayoutCardProps } from 'screens/Explore/internal';

const LayoutCard: FC<LayoutCardProps> = ({
	item,
	onLovePress,
	onAddPress,
	onRemovePress,
	isAdded,
}) => {
	const bindingRef = useRef(null);
	const { storeMeta } = item;
	const coverSrc = { uri: storeMeta.coverUri };
	const iconSrc = { uri: storeMeta.iconUri };

	const handleShowRemoveModal = (widget: WidgetDocument) => {
		modalActions.show({
			id: 'remove-layout-modal',
			component: ({ config }) => (
				<RemoveLayoutBtn
					config={config}
					onRemove={() => onRemovePress?.(widget)}
				/>
			),
			maskActiveOpacity: 0,
			bindingRef: bindingRef,
			positionOffset: {
				y: -4,
			},
			bindingDirection: BindDirections.TopRight,
			animateDirection: AnimateDirections.Inner,
		});
	};

	return (
		<Stack backgroundColor="#131C24" height={259} borderRadius={12}>
			<Image
				src={coverSrc}
				width="100%"
				height={133}
				borderTopLeftRadius={12}
				borderTopRightRadius={12}
			/>
			<Stack
				fullscreen
				paddingHorizontal={12}
				paddingVertical={5}
				display="flex"
				justifyContent="flex-end"
			>
				<Stack
					width={iconWrapperSize}
					height={iconWrapperSize}
					borderRadius={8}
					backgroundColor={storeMeta.iconColor}
					borderWidth={1}
					borderColor={'#131C24'}
					alignItems="center"
					justifyContent="center"
				>
					<Image
						src={iconSrc}
						width={storeMeta.iconSize}
						height={storeMeta.iconSize}
					/>
				</Stack>

				<Text fontSize={14} marginTop={4} fontWeight="600">
					{item.name}
				</Text>

				<Text
					fontSize={12}
					fontWeight="400"
					lineHeight={18}
					color="#566674"
					display="inline"
					wordWrap="break-word"
					textOverflow="ellipsis"
					numberOfLines={2}
					marginTop={4}
				>
					{storeMeta.description}
				</Text>

				<Stack
					display="flex"
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					marginTop={6}
					marginBottom={10}
				>
					<Stack display="flex" flexDirection="row" gap={11}>
						<Stack
							display="flex"
							flexDirection="row"
							justifyContent="space-between"
							alignItems="center"
							gap={4}
							onPress={() => onLovePress?.(item)}
						>
							<Heart size={8} colors={['white', 'none']} />
							<Text fontWeight="400" fontSize={10}>
								{storeMeta.loveCount} Love
							</Text>
						</Stack>

						<Stack
							display="flex"
							flexDirection="row"
							justifyContent="space-between"
							alignItems="center"
							gap={4}
						>
							<Stack
								width={8}
								height={8}
								borderRadius="100%"
								backgroundColor="#4DE2A4"
							/>
							<Text fontWeight="400" fontSize={10}>
								{storeMeta.activeCount} Active
							</Text>
						</Stack>
					</Stack>

					{isAdded ? (
						<LayoutButton
							style={styles.addedButton}
							onPress={() => handleShowRemoveModal?.(item)}
							hoverTitle="Added layout"
							forwardedRef={bindingRef}
						/>
					) : (
						<LayoutButton
							style={styles.addButton}
							onPress={() => onAddPress?.(item)}
							icon={<Plus color="#ffffff" size={16} />}
						/>
					)}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default LayoutCard;

const styles = StyleSheet.create({
	addedButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1F2A34',
		width: 30,
		height: 30,
		paddingVertical: 4,
		paddingHorizontal: 4,
		borderRadius: 8,
	},
	addButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0694D3',
		width: 30,
		height: 30,
		paddingVertical: 4,
		paddingHorizontal: 4,
		borderRadius: 8,
	},
});
const iconWrapperSize = 40;
