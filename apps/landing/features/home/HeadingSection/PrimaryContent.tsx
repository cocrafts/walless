import { FC } from 'react';
import { Button, Stack, Text } from '@walless/gui';
import Anchor from 'components/Anchor';
import BulletSeparator from 'components/BulletSeparator';
import DecorationSquare from 'components/DecorationSquare';

import { features } from './shared';

export const PrimaryContent: FC = () => {
	const spacing = 32;
	const headingElement = (
		<Stack
			horizontal
			flexWrap="wrap"
			paddingVertical={spacing}
			alignItems="flex-end"
		>
			<Stack flex={1}>
				<Text
					fontSize={48}
					fontWeight="500"
					maxWidth={400}
					$xs={{
						textAlign: 'center',
						alignSelf: 'center',
						maxWidth: undefined,
					}}
				>
					<Text>Walless,</Text>
					<Text>the first Web3 sandbox-wallet</Text>
				</Text>
			</Stack>
			<Stack
				marginTop={32}
				paddingLeft={8}
				$xs={{ flex: 1, alignItems: 'center' }}
			>
				<DecorationSquare marginBottom={8} />
				{features.map((feature, index) => {
					return (
						<Text key={index} fontSize={16} lineHeight={35} fontWeight="500">
							{feature}
						</Text>
					);
				})}
			</Stack>
		</Stack>
	);

	const footerElement = (
		<Stack horizontal paddingVertical={spacing} flexWrap="wrap">
			<Stack flex={1}>
				<Text
					fontWeight="400"
					fontSize={16}
					lineHeight={25}
					marginBottom={32}
					maxWidth={400}
					color="rgba(255, 255, 255, 0.4)"
					$sm={{ textAlign: 'center', maxWidth: undefined }}
				>
					Unveiling an entirely new way to think about wallet, Social sign in -
					Custom layout & skin
				</Text>
			</Stack>
			<Stack
				horizontal
				alignItems="flex-start"
				justifyContent="center"
				$sm={{ flex: 1 }}
			>
				<Anchor href="https://forms.gle/tpQz8tm3JPALGJiJ7" target="_blank">
					<Button title="Waiting list" marginHorizontal={8} />
				</Anchor>
				<Anchor
					href="https://www.youtube.com/watch?v=_8NZZKDQ5hM&t=2s"
					target="_blank"
				>
					<Button outline title="Demo" marginHorizontal={8} />
				</Anchor>
			</Stack>
		</Stack>
	);

	return (
		<Stack flex={1} paddingRight={80} $md={{ paddingRight: 0 }}>
			{headingElement}
			<BulletSeparator />
			{footerElement}
		</Stack>
	);
};

export default PrimaryContent;
