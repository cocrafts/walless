import { FC, useState } from 'react';
import { Text, TouchableOpacity, View } from '@walless/ui';

import ContinueButton from '../ContinueButton';

import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import DropdownItemWrapper from './DropdownItemWrapper';
import Input from './Input';

interface TokensViewProps {
	className?: string;
}

export interface Token {
	id: string;
	name: string;
	icon: string;
}

export interface Network {
	id: string;
	name: string;
	icon: string;
}

export interface DropdownItemProps {
	item: Token | Network;
}

const tokens: Token[] = [
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

const networks: Network[] = [
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
	const [selectedToken, setSelectedToken] = useState<Token | null>(null);
	const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);

	const isAbleToContinue: boolean =
		selectedToken !== null && selectedNetwork !== null;

	return (
		<View className="w-full h-full justify-between">
			<View className={`flex items-center w-full gap-3 px-3 ${className}`}>
				<Dropdown
					leftNode={
						selectedToken ? (
							<View className="flex flex-row gap-3 items-center">
								<DropdownItem item={selectedToken} />
							</View>
						) : (
							'Select Token'
						)
					}
				>
					{tokens.map((token) => (
						<DropdownItemWrapper
							key={token.id}
							active={selectedToken?.id === token.id}
							onPress={() => setSelectedToken(token)}
						>
							<DropdownItem item={token} />
						</DropdownItemWrapper>
					))}
				</Dropdown>

				<Dropdown
					leftNode={
						selectedNetwork ? (
							<View className="flex flex-row gap-3 items-center">
								<DropdownItem item={selectedNetwork} />
							</View>
						) : (
							'Select Network'
						)
					}
				>
					{networks.map((network) => (
						<DropdownItemWrapper
							key={network.id}
							active={selectedNetwork?.id === network.id}
							onPress={() => setSelectedNetwork(network)}
						>
							<DropdownItem item={network} />
						</DropdownItemWrapper>
					))}
				</Dropdown>

				<Input title="Recipient account" />

				<Input
					title="Token amount"
					rightNode={
						<TouchableOpacity>
							<Text className="bg-white/10 px-2 pb-[2px] pt-1 rounded h-fit text-[8px]">
								Max
							</Text>
						</TouchableOpacity>
					}
				/>

				<View className="h-[89px] w-full rounded-xl bg-gradient-to-b from-[#1B415A] to=[#112C3F] p-[1px]">
					<View className="w-full h-full bg-[#00131F] rounded-xl"></View>
				</View>
			</View>

			<ContinueButton isAbleToContinue={isAbleToContinue} />
		</View>
	);
};

export default TokensView;
