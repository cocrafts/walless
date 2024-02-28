import type { FC } from 'react';
import {
	ActivityIndicator,
	Image,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import type { UnknownObject } from '@walless/core';
import { Button, Hoverable, Text } from '@walless/gui';
import { AlertCircle } from '@walless/icons';
import LightText from 'components/LightText';
import { HeaderRequest } from 'components/RequestHeader';

import { logoSize, unknownLogo } from '../shared';

interface Props {
	wallet: string;
	sender: UnknownObject;
	content?: string;
	onDeny: () => void;
	onApprove: () => void;
}

export const RequestSignatureApproval: FC<Props> = ({
	sender,
	content,
	wallet,
	onDeny,
	onApprove,
}) => {
	return (
		<View style={styles.container}>
			<HeaderRequest title={wallet} />

			<View style={styles.innerContainer}>
				<View style={styles.headingContainer}>
					<Text style={styles.headingText}>
						Your signature has been requested
					</Text>
					<Image
						style={styles.headingImg}
						source={sender.tab?.favIconUrl || unknownLogo}
					/>
					<Text style={styles.senderText}>
						{sender.tab?.title || 'Unknown'}
					</Text>
					<LightText>{sender.tab?.url || 'unknown'}</LightText>
				</View>

				<View style={styles.contentContainer}>
					<View style={styles.messageContainer}>
						<Text>Message:</Text>
						<AlertCircle size={18} color="#566674" />
					</View>
					{content ? (
						<ScrollView showsVerticalScrollIndicator={false}>
							<LightText lineHeight={20}>{content}</LightText>
						</ScrollView>
					) : (
						<View style={styles.loadingContainer}>
							<ActivityIndicator />
						</View>
					)}
				</View>

				<View style={styles.bottomContainer}>
					<LightText textAlign="center">
						Only confirm if you trust this website
					</LightText>
					<Button title="Confirm" onPress={onApprove}></Button>
					<Hoverable style={styles.deniedButton} onPress={onDeny}>
						<Text>Deny</Text>
					</Hoverable>
				</View>
			</View>
		</View>
	);
};

export default RequestSignatureApproval;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#19232C',
	},
	innerContainer: {
		flex: 1,
		padding: 20,
		alignItems: 'stretch',
	},
	headingContainer: {
		alignItems: 'center',
	},
	headingText: {
		fontSize: 20,
		textAlign: 'center',
	},
	headingImg: {
		width: logoSize,
		height: logoSize,
		borderColor: '#566674',
		borderWidth: 2,
		borderRadius: 15,
		marginVertical: 10,
	},
	senderText: {
		fontSize: 18,
	},
	contentContainer: {
		padding: 15,
		borderRadius: 15,
		marginVertical: 15,
		borderWidth: 1,
		borderColor: 'rgba(86, 102, 116, .2)',
		backgroundColor: '#202D38',
		gap: 10,
		minHeight: 150,
		maxHeight: 200,
		marginBottom: 'auto',
	},
	messageContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	loadingContainer: {
		flex: 1,
		padding: 20,
	},
	bottomContainer: {
		marginTop: 26,
		justifyContent: 'flex-end',
		gap: 10,
	},
	deniedButton: {
		padding: 4,
		alignSelf: 'center',
	},
});
