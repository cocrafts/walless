import { FC, useState } from 'react';
import { useEffect } from 'react';
import { BindDirections, getTransactionFee, modalActions } from '@walless/app';
import { Networks } from '@walless/core';
import { Exclamation } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

import ConfirmTransactionScreen from '../../ConfirmTransaction';
import { DropdownItemProps, dropdownItems } from '../internal';

import Dropdown from './Dropdown';
import Input from './Input';
import NavBtn from './NavBtn';

interface Props {
	modalId: string;
}

export const TokensTab: FC<Props> = ({ modalId }) => {
	const [token, setToken] = useState<DropdownItemProps | null>(null);
	const [network, setNetwork] = useState<DropdownItemProps | null>(null);
	const [receiver, setReceiver] = useState('');
	const [amount, setAmount] = useState(0);
	const [transactionFee, setTransactionFee] = useState(0);

	useEffect(() => {
		(async () => {
			setTransactionFee(await getTransactionFee(network?.value as Networks));
		})();
	}, [network]);

	return (
		<Stack display="flex" alignItems="center" justifyContent="center" gap={12}>
			<Stack
				display="flex"
				alignItems="center"
				justifyContent="center"
				gap={12}
			>
				{dropdownItems.map((item) => {
					let setChosen;
					if (item.type == 'token') {
						setChosen = setToken;
					} else if (item.type == 'network') {
						setChosen = setNetwork;
					}
					return (
						<Dropdown
							key={item.name}
							name={item.name}
							items={item.items}
							setChosen={setChosen as never}
						/>
					);
				})}
			</Stack>

			<Stack position="relative">
				<Input
					content="Recipient account"
					onChangeText={(text: string) => {
						setReceiver(text);
					}}
				/>
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
						~ {transactionFee} {token ? token.value : ''}
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
						{amount !== 0 ? amount + transactionFee : 0}{' '}
						{token ? token.value : ''}
					</Text>
					<Text fontWeight="400" fontSize={12} color="#566674">
						~ 0 USD
					</Text>
				</Stack>
			</Stack>
			<NavBtn
				content="Continue"
				route=""
				onPress={() => {
					modalActions.show({
						id: 'confirm-transacion',
						bindingDirection: BindDirections.InnerBottom,
						component: ConfirmTransactionScreen as never,
						context: {
							token,
							network,
							receiver,
							amount,
							parent: {
								id: modalId,
							},
						},
					});
				}}
			/>
		</Stack>
	);
};

export default TokensTab;
