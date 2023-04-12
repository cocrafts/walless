import { FC, useState } from 'react';
import { useEffect } from 'react';
import { Networks } from '@walless/core';
import { Stack, Text } from '@walless/gui';
import { Exclamation } from '@walless/icons';

import { dropdownItems } from '../internal';

import Dropdown from './Dropdown';
import Input from './Input';

export const TokensTab: FC = () => {
	const [token, setToken] = useState('');
	const [network, setNetwork] = useState<Networks | null>(null);
	const [amount, setAmount] = useState<number>(0);
	const [transactionFee, setTransactionFee] = useState('0');

	useEffect(() => {
		// setTransactionFee();
	}, [network]);

	return (
		<Stack display="flex" alignItems="center" justifyContent="center" gap={20}>
			<Stack
				display="flex"
				alignItems="center"
				justifyContent="center"
				gap={20}
			>
				{dropdownItems.map((item) => {
					let setValue;
					if (item.type == 'token') {
						setValue = setToken;
					} else if (item.type == 'network') {
						setValue = setNetwork;
					}
					return (
						<Dropdown
							key={item.name}
							name={item.name}
							items={item.items}
							setValue={setValue as never}
						/>
					);
				})}
			</Stack>

			<Stack position="relative">
				<Input
					content="Token amount"
					rightNode={
						<Text
							position="absolute"
							backgroundColor="#1E2830"
							fontWeight="400"
							fontSize={10}
							color="#FFFFFF"
							paddingHorizontal={6}
							paddingVertical={4}
							borderRadius={6}
							zIndex={1}
							marginLeft={288}
							marginRight={16}
						>
							Max
						</Text>
					}
					onChangeText={(text: string) => {
						setAmount(Number(text));
					}}
				/>
			</Stack>

			<Stack
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="flex-start"
				width="100%"
			>
				<Stack
					display="flex"
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					gap={4}
				>
					<Exclamation color="#566674" size={10} />
					<Text fontWeight="500" fontSize={14} color="#566674">
						Network fee
					</Text>
				</Stack>

				<Stack
					display="flex"
					justifyContent="center"
					alignItems="flex-end"
					gap={4}
				>
					<Text fontWeight="500" fontSize={14} color="#FFFFFF">
						~ {transactionFee} {token ? token : ''}
					</Text>
					<Text fontWeight="400" fontSize={12} color="#566674">
						~ 0 secs
					</Text>
				</Stack>
			</Stack>

			<Stack width={336} height={1} backgroundColor="#566674" />

			<Stack
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="flex-start"
				width="100%"
			>
				<Stack
					display="flex"
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					gap={4}
				>
					<Text fontWeight="500" fontSize={14} color="#EEEEEE">
						Total cost
					</Text>
				</Stack>

				<Stack
					display="flex"
					justifyContent="center"
					alignItems="flex-end"
					gap={4}
				>
					<Text fontWeight="600" fontSize={20} color="#EEEEEE">
						{amount} {token ? token : ''}
					</Text>
					<Text fontWeight="400" fontSize={12} color="#566674">
						~ 0 USD
					</Text>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default TokensTab;
