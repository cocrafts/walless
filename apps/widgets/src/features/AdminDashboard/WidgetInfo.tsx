import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Widget } from '@walless/graphql';
import { WidgetStatus } from '@walless/graphql';
import { Button, Text, View } from '@walless/gui';
import Image from 'next/image';

interface RowProps {
	title: string;
	value?: string | null;
}

const TextRow: FC<RowProps> = ({ title, value }) => (
	<View style={styles.rowContainer}>
		<Text style={styles.rowTitleText}>{title}</Text>
		<Text style={styles.rowValueContainer}>{value ?? 'No value'}</Text>
	</View>
);

const ImageRow: FC<RowProps> = ({ title, value }) => (
	<View style={[styles.rowContainer, { flexDirection: 'column' }]}>
		<Text style={styles.rowTitleText}>{title}</Text>
		<Image src={value ?? ''} alt={title} width={100} height={100} />
	</View>
);

interface Props {
	item: Widget;
	onUpdateStatus: (id: string, status: WidgetStatus) => void;
}

export const WidgetInfo: FC<Props> = ({ item, onUpdateStatus }) => {
	const statusList = Object.values(WidgetStatus) as WidgetStatus[];

	const onStatusChange = (status: WidgetStatus) => {
		item.status !== status && onUpdateStatus(item.id, status);
	};

	return (
		<View style={styles.tableContainer}>
			<TextRow title="id" value={item.id} />
			<TextRow title="name" value={item.name} />
			<TextRow title="description" value={item.description} />
			<TextRow title="networks" value={item.networks?.join(', ')} />
			<View style={styles.imageContainer}>
				<ImageRow title="logo" value={item.logo} />
				<ImageRow title="largeLogo" value={item.largeLogo} />
				<ImageRow title="banner" value={item.banner} />
			</View>
			<View style={styles.rowContainer}>
				<Text style={styles.rowTitleText}>status</Text>
				<View style={styles.statusContainer}>
					{statusList.map((statusEnum) => (
						<Button
							key={statusEnum}
							title={statusEnum}
							onPress={() => onStatusChange(statusEnum)}
							style={item.status !== statusEnum && styles.inactiveStatus}
						/>
					))}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	tableContainer: {
		backgroundColor: '#131B22',
		flex: 1,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 12,
		paddingVertical: 36,
		paddingHorizontal: 36,
		gap: 23,
	},
	rowContainer: {
		flexDirection: 'row',
		gap: 12,
	},
	rowTitleText: {
		minWidth: 120,
		color: '#0694D3',
	},
	rowValueContainer: {
		minWidth: 200,
	},
	imageContainer: {
		flexDirection: 'row',
		gap: 20,
	},
	statusContainer: {
		flexDirection: 'row',
		gap: 12,
	},
	inactiveStatus: {
		backgroundColor: '#243F56',
	},
});

export default WidgetInfo;
