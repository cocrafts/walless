import { FC } from 'react';
import { TextInput } from 'react-native';
import { Text, View } from '@walless/ui';
import IconSearch from '@walless/ui/components/IconSearch';

import ChooseLayoutCard from './ChooseLayoutCard';

export const ChooseLayout: FC = () => {
	return (
		<View className="bg-white h-full flex gap-4">
			<View className="bg-[#1072B7] h-[150px] flex justify-center items-center rounded-b-lg">
				<View>
					<Text className="text-xl mb-4">Choose a nicely layout to start</Text>
					<View className="bg-[#E9E9E9] h-10 px-4 flex flex-row items-center gap-2">
						<IconSearch size={16} color="#00000080" />
						<TextInput placeholder="Explore exciting project" />
					</View>
				</View>
			</View>

			<View className="w-[320px] mx-auto flex gap-2">
				<ChooseLayoutCard
					name="Solana"
					description="Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla
							dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus
							ornare morbi porttitor."
					activeUsers={24}
				/>

				<ChooseLayoutCard
					name="Solana"
					description="Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla
							dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus
							ornare morbi porttitor."
					love={10}
					activeUsers={20}
				/>

				<ChooseLayoutCard
					name="Solana"
					description="Lorem ipsum dolor sit amet consectetur. Amet lectus volutpat nulla
							dapibus ornare morbi porttitor. Amet lectus volutpat nulla dapibus
							ornare morbi porttitor."
					love={12}
				/>
			</View>
		</View>
	);
};

export default ChooseLayout;
