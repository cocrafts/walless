import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle } from '@walless/icons';
import { PopupType } from '@walless/messaging';
import { Anchor, Button, Image, Stack, Text } from '@walless/ui';
import { handleRequestInstallLayout } from 'bridge/listeners';
import { HeaderRequest } from 'components/HeaderRequest';
import LightText from 'components/LightText';
import { initializeKernelConnect } from 'utils/helper';

import { logoSize, logoUri } from '../shared';

export const RequestLayout = () => {
	const { requestId } = useParams();

	const onApprovePress = () => {
		handleRequestInstallLayout(requestId as string, true);
	};

	const onNeverAskAgainPress = () => {
		handleRequestInstallLayout(requestId as string, false);
	};

	const onAskMeLaterPress = () => {
		handleRequestInstallLayout(requestId as string, false);
	};

	useEffect(() => {
		initializeKernelConnect(
			PopupType.REQUEST_INSTALL_LAYOUT_POPUP + '/' + requestId,
		);
	}, []);

	return (
		<Stack flex={1} backgroundColor="#19232C">
			<HeaderRequest />

			<Stack flex={1} padding={20} alignItems="stretch">
				<Stack alignItems="center">
					<Text fontSize={20} fontWeight="400">
						Layout request
					</Text>
					<Image
						src={logoUri}
						width={logoSize}
						height={logoSize}
						borderColor="#566674"
						borderWidth={2}
						borderRadius={15}
						marginVertical={10}
					/>
					<Text fontSize={18} fontWeight="400">
						Under Realm
					</Text>
					<LightText fontSize={14}>underrealm.stormgate.io</LightText>
				</Stack>

				<Stack paddingTop={30} alignItems="center">
					<Text textAlign="center" fontSize={14} fontWeight="300">
						Under Realm would like to add its custom layout appearance to your
						Walless account.
					</Text>

					<Anchor
						href="_"
						marginTop={15}
						color="#0694D3"
						textDecorationLine="none"
					>
						Learn more
					</Anchor>
				</Stack>

				<Stack flex={1} justifyContent="flex-end">
					<Stack
						horizontal
						alignItems="center"
						backgroundColor="#202D38"
						borderRadius={15}
						marginBottom={20}
						padding={15}
						borderColor="rgba(86, 102, 116, .2)"
						borderWidth={1}
					>
						<Stack width={18}>
							<AlertCircle size={18} color="#566674" />
						</Stack>
						<LightText fontSize={12} marginLeft={15}>
							This action does not make any fund transfer. This site cannot
							transfer fund without your permission.
						</LightText>
					</Stack>

					<Stack paddingHorizontal={10}>
						<LightText fontSize={14} textAlign="center">
							Only connect to websites you trust!
						</LightText>
						<Button marginVertical={10} onPress={onApprovePress}>
							<Text>Accept</Text>
						</Button>
						<Stack
							horizontal
							justifyContent="space-between"
							alignItems="center"
						>
							<Button
								backgroundColor="transparent"
								padding={0}
								onPress={onNeverAskAgainPress}
							>
								<LightText>Never Ask Again</LightText>
							</Button>
							<Button
								backgroundColor="transparent"
								padding={0}
								onPress={onAskMeLaterPress}
							>
								<Text fontWeight="300">Ask me later</Text>
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default RequestLayout;
