import { FC } from 'react';
import { ChevronRightIcon, IdCardIcon, Text, View } from '@walless/ui';

import Dropdown from './Dropdown';
import Input from './Input';

interface TokensViewProps {
	className?: string;
	setContinue: (value: boolean) => void;
}

const TokensView: FC<TokensViewProps> = ({ className }) => {
	return (
		<View className={`flex items-center w-full gap-3 px-3 ${className}`}>
			<Dropdown title="Select network">
				<Text>Hello</Text>
			</Dropdown>

			<Dropdown title="Choose your account">
				<Text>Hello</Text>
			</Dropdown>

			<Input
				title="Recipient account"
				rightNode={<IdCardIcon color="#99B0BF" size={16} />}
			/>

			<Input
				title="Token amount"
				rightNode={
					<View className="flex flex-row gap-2 items-center">
						<Text className="bg-white/10 px-2 pb-[2px] pt-1 rounded h-fit text-[8px]">
							Max
						</Text>
						<Text className="text-sm text-[#99B0BF]">SOL</Text>
						<ChevronRightIcon color="white" size={16} />
					</View>
				}
			/>

			<View className="h-[89px] w-full rounded-xl bg-gradient-to-b from-[#1B415A] to=[#112C3F] p-[1px]">
				<View className="w-full h-full bg-[#00131F] rounded-xl"></View>
			</View>
		</View>
	);
};

export default TokensView;
