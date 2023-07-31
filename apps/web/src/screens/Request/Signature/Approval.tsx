import type { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import type { UnknownObject } from '@walless/core';
import { AlertCircle } from '@walless/icons';
import { Button, Image, Stack, Text } from '@walless/ui';
import { HeaderRequest } from 'components/HeaderRequest';
import LightText from 'components/LightText';

import { logoSize, logoUri } from '../shared';

interface Props {
	sender: UnknownObject;
	content?: string;
	onDeny: () => void;
	onApprove: () => void;
}

export const RequestSignatureApproval: FC<Props> = ({
	sender,
	content,
	onDeny,
	onApprove,
}) => {
	return (
		<Stack flex={1} backgroundColor="#19232C">
			<HeaderRequest />

			<Stack flex={1} padding={20} alignItems="stretch">
				<Stack alignItems="center">
					<Text fontSize={20} fontWeight="400">
						Your signature has been requested
					</Text>
					<Image
						src={sender.tab?.favIconUrl || logoUri}
						width={logoSize}
						height={logoSize}
						borderColor="#566674"
						borderWidth={2}
						borderRadius={15}
						marginVertical={10}
					/>
					<Text fontSize={18} fontWeight="400">
						{sender.tab?.title || 'Unknown'}
					</Text>
					<LightText fontSize={14}>{sender.tab?.url}</LightText>
				</Stack>

				<Stack
					backgroundColor="#202D38"
					borderRadius={15}
					marginVertical={15}
					borderColor="rgba(86, 102, 116, .2)"
					borderWidth={1}
				>
					<Stack
						horizontal
						justifyContent="space-between"
						alignItems="center"
						paddingHorizontal={15}
						paddingTop={15}
						paddingBottom={5}
					>
						<Text fontSize={14}>Message:</Text>
						<AlertCircle size={18} color="#566674" />
					</Stack>
					<LightText paddingHorizontal={15} paddingBottom={15} fontSize={14}>
						{content ? content : <ActivityIndicator />}
					</LightText>
				</Stack>

				<Stack flex={1} justifyContent="flex-end" paddingHorizontal={10}>
					<LightText fontSize={14} textAlign="center">
						Only connect to websites you trust!
					</LightText>
					<Button marginVertical={10} onPress={onApprove}>
						<Text>Connect</Text>
					</Button>
					<Button
						backgroundColor="transparent"
						paddingVertical={0}
						onPress={onDeny}
					>
						<Text>Deny</Text>
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default RequestSignatureApproval;
