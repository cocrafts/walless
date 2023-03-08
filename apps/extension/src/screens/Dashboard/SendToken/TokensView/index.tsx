import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InformationIcon, Text, View } from '@walless/ui';

import ConfirmButton from '../ConfirmButton';

import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import Input from './Input';

interface TokensViewProps {
	className?: string;
}

export interface DropdownItemProps {
	id: string;
	name: string;
	icon: string;
}

const tokens: DropdownItemProps[] = [
	{
		id: 'tk1',
		name: 'SOL',
		icon: '/img/icon-solana-dark.png',
	},
	{
		id: 'tk2',
		name: 'ETH',
		icon: '/img/icon-solana-dark.png',
	},
	{
		id: 'tk3',
		name: 'BTC',
		icon: '/img/icon-solana-dark.png',
	},
];

const networks: DropdownItemProps[] = [
	{
		id: 'nw1',
		name: 'Solana',
		icon: '/img/icon-solana-dark.png',
	},
	{
		id: 'nw2',
		name: 'Ethereum',
		icon: '/img/icon-solana-dark.png',
	},
	{
		id: 'nw3',
		name: 'Bitcoin',
		icon: '/img/icon-solana-dark.png',
	},
];

const TokensView: FC<TokensViewProps> = ({ className }) => {
	const [selectedToken, setSelectedToken] = useState<DropdownItemProps | null>(
		null,
	);
	const [selectedNetwork, setSelectedNetwork] =
		useState<DropdownItemProps | null>(null);
	const [recipient, setRecipient] = useState('');
	const [amount, setAmount] = useState('');

	const navigate = useNavigate();

	const isAbleToContinue: boolean =
		selectedToken !== null &&
		selectedNetwork !== null &&
		recipient !== '' &&
		amount !== '';

	const transactionId = '0x1234567890';

	return (
		<View
			className={`w-full rounded-t-[20px] flex justify-between pb-5 ${className}`}
		>
			<View className={`flex items-center w-full gap-3`}>
				<Dropdown
					leftNode={
						selectedToken ? (
							<View className="flex flex-row gap-3 items-center">
								<DropdownItem {...selectedToken} />
							</View>
						) : (
							'Select Token'
						)
					}
					data={tokens}
					activeItem={selectedToken}
					onSelect={setSelectedToken}
				/>

				<Dropdown
					leftNode={
						selectedNetwork ? (
							<View className="flex flex-row gap-3 items-center">
								<DropdownItem {...selectedNetwork} />
							</View>
						) : (
							'Select Network'
						)
					}
					data={networks}
					activeItem={selectedNetwork}
					onSelect={setSelectedNetwork}
				/>

				<Input title="Recipient account" onTextChange={setRecipient} />

				<Input title="Token amount" onTextChange={setAmount} maxValue="999" />

				<View className="h-[89px] w-full rounded-xl bg-gradient-to-b from-[#1B415A] to=[#112C3F] p-[1px]">
					<View className="w-full h-full bg-[#00131F] rounded-xl flex flex-row">
						<View className="h-full w-full flex-shrink-[2] items-end justify-center pr-4 border-r border-[#1C3A4E]">
							<View className="flex flex-row justify-center items-center gap-1">
								<View className="group">
									<Text className="absolute z-auto -left-4 -top-20 bg-[#066996] p-3 w-[363px] rounded-lg invisible transition group-hover:visible">
										The difference between the market price and estimated price
										based on your trade size.
									</Text>
									<InformationIcon size={8} color="#587A90" />
								</View>
								<Text className="text-[#587A90] text-xs">Network Fee</Text>
							</View>
							<Text className="text-[#26A3D7] text-xs">~ 0 USD</Text>
							<Text className="text-[#587A90] text-[10px]">~ 0 secs</Text>
						</View>
						<View className="h-full w-full flex-shrink items-end justify-center pr-4">
							<Text className="text-sm">Total Cost</Text>
							<Text className="text-2xl">0</Text>
							<Text className="text-[#587A90] text-[10px]">~ 0 secs</Text>
						</View>
					</View>
				</View>
			</View>

			<ConfirmButton
				disable={!isAbleToContinue}
				onPress={() => navigate(`/send-token/confirm-token/${transactionId}}`)}
			/>
		</View>
	);
};

export default TokensView;
