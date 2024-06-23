import type { FC } from 'react';
import { useEffect } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Networks, PopupType } from '@walless/core';
import { Button, Hoverable, Text, View } from '@walless/gui';
import { AlertCircle, CheckCircle } from '@walless/icons';
import { handleRequestConnect } from 'bridge';
import { initializeKernelConnect } from 'bridge/helpers';
import { LightText } from 'components/LightText';
import { HeaderRequest } from 'components/RequestHeader';
import { usePublicKeys, useRequestData } from 'utils/hooks';
import type { RequestsParamList } from 'utils/navigation';

import { logoSize, unknownLogo } from './shared';

type Props = StackScreenProps<RequestsParamList, 'RequestConnect'>;

const RequestConnect: FC<Props> = ({ route }) => {
	const { resolveId } = route.params;
	const { sender, options } = useRequestData(
		resolveId as string,
		PopupType.REQUEST_CONNECT_POPUP,
	);
	const publicKey = usePublicKeys(options.network || Networks.solana)[0];

	const onApprovePress = () => {
		handleRequestConnect(resolveId as string, true);
	};

	const onRejectPress = () => {
		handleRequestConnect(resolveId as string, false);
	};

	useEffect(() => {
		initializeKernelConnect(PopupType.REQUEST_CONNECT_POPUP + '/' + resolveId);
	}, []);

	const title = sender.tab?.title || 'Unknown';

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<HeaderRequest title={publicKey._id} />

			<View style={styles.innerContainer}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Connection request</Text>
					<Image
						style={styles.titleImage}
						source={{ uri: sender.tab?.favIconUrl || unknownLogo }}
					/>
					<Text style={styles.senderName}>{title}</Text>
					<LightText textAlign="center" fontSize={14}>
						{sender.origin || 'unknown'}
					</LightText>
				</View>

				<View style={styles.contentContainer}>
					<View style={styles.mainContentContainer}>
						<LightText fontSize={14} lineHeight={20} textAlign="center">
							{title} would like to connect with your Walless account to:
						</LightText>

						<View style={styles.activityContainer} horizontal>
							<CheckCircle size={18} color="#1FC17D" />
							<Text style={styles.activityText}>
								View your wallet balance & activity
							</Text>
						</View>

						<View style={styles.activityContainer} horizontal>
							<CheckCircle size={18} color="#1FC17D" />
							<Text style={styles.activityText}>
								Send you request approval for transaction
							</Text>
						</View>
					</View>

					<View style={styles.noteContainer} horizontal>
						<AlertCircle size={30} color="#566674" />
						<LightText fontSize={12} marginLeft={15} lineHeight={18}>
							This action does not make any fund transfer. This site cannot
							transfer fund without your permission.
						</LightText>
					</View>
				</View>

				<View style={styles.bottomContainer}>
					<LightText textAlign="center">
						Only connect to websites you trust!
					</LightText>
					<Button title="Connect" onPress={onApprovePress} />
					<Hoverable style={styles.deniedButton} onPress={onRejectPress}>
						<Text>Deny</Text>
					</Hoverable>
				</View>
			</View>
		</ScrollView>
	);
};

export default RequestConnect;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#19232C',
	},
	innerContainer: {
		flex: 1,
		padding: 20,
	},
	titleContainer: {},
	title: {
		fontSize: 20,
		textAlign: 'center',
	},
	titleImage: {
		width: logoSize,
		height: logoSize,
		borderColor: '#566674',
		borderWidth: 2,
		borderRadius: 15,
		marginVertical: 10,
		alignSelf: 'center',
	},
	senderName: {
		fontSize: 18,
		fontWeight: '500',
		textAlign: 'center',
		marginBottom: 4,
	},
	contentContainer: {
		backgroundColor: '#202D38',
		borderRadius: 15,
		marginVertical: 15,
		borderColor: 'rgba(86, 102, 116, .2)',
		borderWidth: 1,
	},
	mainContentContainer: {
		gap: 8,
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(86, 102, 116, .2)',
	},
	activityContainer: {
		gap: 10,
		alignItems: 'center',
	},
	activityText: {
		fontWeight: '300',
	},
	noteContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		alignItems: 'center',
	},
	bottomContainer: {
		marginTop: 'auto',
		gap: 10,
	},
	deniedButton: {
		padding: 4,
		alignSelf: 'center',
	},
});
