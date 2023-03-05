import { Link } from 'react-router-dom';
import { Image, View } from '@walless/ui';

import { CollectibleProps } from '.';

const CollectibleItem = ({ item }: { item: CollectibleProps }) => {
	return (
		<View key={item.name} className="w-[84px]">
			<Link to={item.link}>
				<Image
					source={{ uri: item.thumbnail }}
					className="h-[90px] w-[84px] rounded-lg"
				/>
				<View className="h-[90px] w-[84px] absolute top-0 bg-gradient-to-t from-[#001F34CC] to-[#17354900]"></View>
			</Link>

			<View className="flex flex-row gap-1">
				<Link to={item.link}>
					<Image source={{ uri: item.icon }} className="h-5 w-5 ml-2 -mt-2" />
				</Link>
				<Link className="h-3 text-[8px] mt-1 truncate" to={item.link}>
					{item.name}
				</Link>
			</View>
		</View>
	);
};

export default CollectibleItem;
