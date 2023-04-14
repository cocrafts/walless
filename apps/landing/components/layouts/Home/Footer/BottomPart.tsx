import { Stack, Text } from '@walless/gui';
import Link from 'next/link';

const BottomPart = () => {
	const fontSize = 12;

	return (
		<Stack
			width="100%"
			flexDirection="column-reverse"
			alignItems="center"
			gap={28}
			$gtMd={{
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<Text fontSize={fontSize} color="#566674">
				Copyright @ 2023. All rights reserved.
			</Text>
			<Stack
				alignItems="center"
				gap={8}
				$gtMd={{
					flexDirection: 'row',
					gap: 36,
				}}
			>
				<Link href="/">
					<Text fontSize={fontSize}>Terms & Conditions</Text>
				</Link>
				<Link href="/privacy-policy">
					<Text fontSize={fontSize}>Privacy Policy</Text>
				</Link>
			</Stack>
		</Stack>
	);
};

export default BottomPart;
