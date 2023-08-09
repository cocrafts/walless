import { Button, Text, View } from '@walless/gui';
import { Plus } from '@walless/icons';

const LayoutCardBottomPart = () => {
	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				marginTop: 6,
				marginBottom: 10,
			}}
		>
			<View horizontal>
				<View>
					<Text>♥ 100 Love</Text>
				</View>

				<View horizontal>
					<Text>200 Active</Text>
				</View>
			</View>

			<Button>
				<Plus size={12} />
			</Button>
		</View>
	);
};

export default LayoutCardBottomPart;
