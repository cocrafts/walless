import type { FC } from 'react';
import {
	ActivityIndicator,
	Image,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import type { UnknownObject } from '@walless/core';
import { Button, Text } from '@walless/gui';
import { AlertCircle } from '@walless/icons';
import { HeaderRequest } from 'components/HeaderRequest';

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
		<View style={styles.container}>
			<HeaderRequest />

			<View style={styles.innerContainer}>
				<View style={styles.headingContainer}>
					<Text style={styles.headingText}>
						Your signature has been requested
					</Text>
					<Image
						style={styles.headingImg}
						source={sender.tab?.favIconUrl || logoUri}
					/>
					<Text style={styles.senderText}>
						{sender.tab?.title || 'Unknown'}
					</Text>
					<Text>{sender.tab?.url}</Text>
				</View>

				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<View style={styles.messageContainer}>
						<Text>Message:</Text>
						<AlertCircle size={18} color="#566674" />
					</View>
					<Text style={styles.contentText}>
						{content ? content : <ActivityIndicator />}
					</Text>
				</ScrollView>

				<View style={styles.footerContainer}>
					<Text style={styles.trustText}>
						Only connect to websites you trust!
					</Text>
					<Button style={styles.connectButton} onPress={onApprove}>
						<Text>Connect</Text>
					</Button>
					<Button style={styles.outlineButton} onPress={onDeny}>
						<Text>Deny</Text>
					</Button>
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
	scrollContainer: {
		maxHeight: 220,
		backgroundColor: '#202D38',
		borderRadius: 15,
		marginVertical: 15,
		borderColor: 'rgba(86, 102, 116, .2)',
		borderWidth: 1,
	},
	messageContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingTop: 15,
		paddingBottom: 5,
	},
	contentText: {
		paddingHorizontal: 15,
		paddingBottom: 16,
		fontSize: 14,
	},
	footerContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 10,
	},
	trustText: {
		textAlign: 'center',
	},
	connectButton: {
		marginVertical: 10,
	},
	outlineButton: {
		backgroundColor: 'transparent',
		paddingVertical: 0,
	},
});
