import { Hoverable } from '@walless/gui';
import { Eye, EyeOff } from '@walless/icons';
import { Stack, Text } from '@walless/ui';
import { settingsActions, settingState } from 'state/settings';
import { useSnapshot } from 'valtio';

const TokenValue = () => {
	const { _id, isPrivate } = useSnapshot(settingState);

	const handleToggleTokenValue = async () => {
		settingsActions.updatePrivateSettings({
			_id: _id || '',
			isPrivate: !isPrivate,
		});
	};

	return (
		<Stack alignItems="center" gap={16}>
			<Text color="#566674" textAlign="center" fontSize={14}>
				Token value
			</Text>
			<Stack flexDirection="row" alignItems="center" gap={5}>
				<Text fontSize={40} fontWeight="500" lineHeight={26}>
					{isPrivate ? '****' : '$0,00'}
				</Text>
				<Hoverable onPress={handleToggleTokenValue}>
					{isPrivate ? (
						<Eye size={20} color="#566674" />
					) : (
						<EyeOff size={20} color="#566674" />
					)}
				</Hoverable>
			</Stack>
		</Stack>
	);
};

export default TokenValue;
