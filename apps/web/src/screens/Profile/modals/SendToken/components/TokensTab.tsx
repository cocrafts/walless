import { FC } from 'react';
import { Stack, Text } from '@walless/gui';
import { Exclamation } from '@walless/icons';

import { mockDropdownItems } from '../internal';

import Dropdown from './Dropdown';
import Input from './Input';

export const TokensTab: FC = () => {
	return (
		<Stack display="flex" alignItems="center" justifyContent="center" gap={20}>
			<Stack
				display="flex"
				alignItems="center"
				justifyContent="center"
				gap={20}
			>
				{mockDropdownItems.map((item) => (
					<Dropdown key={item.name} name={item.name} items={item.items} />
				))}
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
						~ 0 USD
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
						234,87634
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
