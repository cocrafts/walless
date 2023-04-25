import { useState } from 'react';
import { Eye, EyeOff } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

const TokenValue = () => {
	const [hideTokenValue, setHideTokenValue] = useState(true);

	const handleToggleTokenValue = () => {
		setHideTokenValue(!hideTokenValue);
	};

	return (
		<Stack alignItems="center" gap={16}>
			<Text color="#566674" textAlign="center" fontSize={14}>
				Token value
			</Text>
			<Stack flexDirection="row" alignItems="center" gap={5}>
				<Text fontSize={40} fontWeight="500" lineHeight={26}>
					{hideTokenValue ? '****' : '$0,00'}
				</Text>
				<Stack onPress={handleToggleTokenValue}>
					{hideTokenValue ? (
						<Eye size={20} color="#566674" />
					) : (
						<EyeOff size={20} color="#566674" />
					)}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default TokenValue;
