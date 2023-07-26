import { Stack, Text } from '@walless/ui';
import { ContainerStack } from 'components/styled';
import Link from 'next/link';

const BottomPart = () => {
	const fontSize = 12;

	return (
		<ContainerStack
			flexDirection="column-reverse"
			gap={28}
			$gtMd={{
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<Text fontSize={fontSize} color="#566674" textAlign="center">
				Version {process.env.EXTENSION_VERSION}, Copyright @ 2023. All rights
				reserved.
			</Text>
			<Stack
				alignItems="center"
				gap={8}
				$gtMd={{
					flexDirection: 'row',
					gap: 36,
				}}
			>
				<Link href="/disclaimer">
					<Text fontSize={fontSize}>Beta Disclaimer</Text>
				</Link>
				<Link href="/">
					<Text fontSize={fontSize}>Terms & Conditions</Text>
				</Link>
				<Link href="/privacy-policy">
					<Text fontSize={fontSize}>Privacy Policy</Text>
				</Link>
			</Stack>
		</ContainerStack>
	);
};

export default BottomPart;
