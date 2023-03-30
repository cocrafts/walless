import React, { ReactNode } from 'react';
import { Button, Stack } from '@walless/wui';
import { useRouter } from 'next/router';
import { useSnapshot } from 'utils/hook';
import { layoutProxy } from 'utils/state/layout';
import { LayoutProxy } from 'utils/state/layout/type';

interface Props {
	children: ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
	const router = useRouter();
	const layout = useSnapshot<LayoutProxy>(layoutProxy);
	const layoutHashList = Object.keys(layout);
	console.log(layoutHashList);

	return (
		<Stack horizontal flex={1} alignItems="stretch">
			<Stack width={50} backgroundColor="#131C24">
				{layoutHashList.map((hash, index) => {
					const { id } = layout[hash];

					return (
						<Button key={index} onPress={() => router.push(`/layout/${hash}`)}>
							{id}
						</Button>
					);
				})}
				<Button onPress={() => router.push('/')}>Exp.</Button>
			</Stack>
			<Stack flex={1} backgroundColor="#19232C">
				{children}
			</Stack>
		</Stack>
	);
};

export default DashboardLayout;
