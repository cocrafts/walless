import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { type Maybe, type Widget, WidgetStatus } from '@walless/graphql';
import { Button, Text, View } from '@walless/gui';
import Image from 'next/image';

interface RowProps {
	title: string;
	value: Maybe<string | undefined>;
}

const RowText: FC<RowProps> = ({ title, value }) => (
	<View style={styles.row}>
		<Text style={styles.title}>{title}</Text>
		{value ? (
			<Text style={styles.value}>{value}</Text>
		) : (
			<Text style={styles.value}>No value</Text>
		)}
	</View>
);

const RowImage: FC<RowProps> = ({ title, value }) => (
	<View style={styles.row}>
		<Text style={styles.title}>{title}</Text>
		{value ? (
			<Image src={value} alt={title} width={100} height={100} />
		) : (
			<Text style={styles.value}>No value</Text>
		)}
	</View>
);

interface WidgetInfoProps extends Widget {
	onUpdateStatus: (id: string, status: WidgetStatus) => void;
}

export const WidgetInfo: FC<WidgetInfoProps> = ({
	id,
	name,
	description,
	networks,
	logo,
	largeLogo,
	banner,
	status,
	onUpdateStatus,
}) => {
	const statusList = Object.values(WidgetStatus) as WidgetStatus[];

	return (
		<View style={styles.table}>
			<RowText title="id" value={id} />
			<RowText title="name" value={name} />
			<RowText title="description" value={description} />
			<RowText title="networks" value={networks?.join(', ')} />
			<RowImage title="logo" value={logo} />
			<RowImage title="largeLogo" value={largeLogo} />
			<RowImage title="banner" value={banner} />
			<View style={styles.row}>
				<Text style={styles.title}>status</Text>
				{statusList.map((statusEnum) => (
					<Button
						key={statusEnum}
						title={statusEnum}
						onPress={() =>
							status !== statusEnum && onUpdateStatus(id, statusEnum)
						}
						style={status !== statusEnum && styles.inactiveStatus}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	table: {
		flex: 1,
		borderWidth: 1,
		borderColor: 'white',
		padding: 16,
		gap: 16,
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		gap: 12,
	},
	title: {
		minWidth: 120,
		color: 'orange',
	},
	value: {
		minWidth: 200,
	},
	inactiveStatus: {
		backgroundColor: '#243F56',
	},
});

export default WidgetInfo;
