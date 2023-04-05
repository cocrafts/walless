import { AlertCircle, Button, CheckCircle, Stack, Text } from '@walless/gui';
import { Image } from '@walless/gui';
import { HeaderRequest } from 'components/HeaderRequest';
import LightText from 'components/LightText';

import { logoSize, logoUri } from '../shared';

const RequestConnection = () => {
	return (
		<Stack flex={1} backgroundColor="#19232C">
			<HeaderRequest />

			<Stack flex={1} padding={20} alignItems="stretch">
				<Stack alignItems="center">
					<Text fontSize={20} fontWeight="400">
						Connection request
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

				<Stack
					backgroundColor="#202D38"
					borderRadius={15}
					marginVertical={15}
					borderColor="rgba(86, 102, 116, .2)"
					borderWidth={1}
				>
					<Stack padding={15}>
						<LightText fontSize={14} paddingHorizontal={25} textAlign="center">
							Under Realm would like to connect with your Walless account to:
						</LightText>
						<Stack paddingTop={15} gap={10}>
							<Stack horizontal alignItems="center">
								<CheckCircle size={18} color="#1FC17D" />
								<Text marginLeft={15} fontSize={14} fontWeight={'300'}>
									View your wallet balance & activity
								</Text>
							</Stack>
							<Stack horizontal alignItems="center">
								<CheckCircle size={18} color="#1FC17D" />
								<Text marginLeft={15} fontSize={14} fontWeight={'300'}>
									Send you request approval for transaction
								</Text>
							</Stack>
						</Stack>
					</Stack>
					<Stack borderTopColor="rgba(86, 102, 116, .2)" borderTopWidth={1} />
					<Stack horizontal alignItems="center" padding={15}>
						<Stack width={18}>
							<AlertCircle size={18} color="#566674" />
						</Stack>
						<LightText fontSize={12} marginLeft={15}>
							This action does not make any fund transfer. This site cannot
							transfer fund without your permission.
						</LightText>
					</Stack>
				</Stack>

				<Stack flex={1} justifyContent="flex-end" paddingHorizontal={10}>
					<LightText fontSize={14} textAlign="center">
						Only connect to websites you trust!
					</LightText>
					<Button marginVertical={10} onPress={() => console.log('hmmmm')}>
						<Text>Connect</Text>
					</Button>
					<Button backgroundColor="transparent" paddingVertical={0}>
						<Text>Deny</Text>
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default RequestConnection;
