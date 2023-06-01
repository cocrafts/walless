import { Hoverable } from '@walless/gui';
import { Eye, EyeOff } from '@walless/icons';
import { Stack, Text } from '@walless/ui';
import { useSettings } from 'utils/hooks';

const TokenValue = () => {
	const { setting, setPrivacy } = useSettings();

	const handleToggleTokenValue = async () => {
		setPrivacy({ hideBalance: !setting.hideBalance });
	};

	return (
		<Stack alignItems="center" gap={16}>
			<Text color="#566674" textAlign="center" fontSize={14}>
				Token value
			</Text>
			<Stack flexDirection="row" alignItems="center" gap={5}>
				<Text fontSize={40} fontWeight="500" lineHeight={26}>
					{setting.hideBalance ? '****' : '$0,00'}
				</Text>
				<Hoverable onPress={handleToggleTokenValue}>
					{setting.hideBalance ? (
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
