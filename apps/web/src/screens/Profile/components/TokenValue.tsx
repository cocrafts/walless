import { useState } from 'react';
import { Stack, Text } from '@walless/gui';
import { ChevronRight, Eye, EyeOff } from '@walless/icons';

const TokenValue = () => {
	const [hideTokenValue, setHideTokenValue] = useState(false);

	const handleToggleTokenValue = () => {
		setHideTokenValue(!hideTokenValue);
	};

	return (
		<Stack display="flex" alignItems="center" gap={16}>
			<Stack display="flex" flexDirection="row" alignItems="center" gap={6}>
				<Text color="#566674" fontSize={14}>
					Token value
				</Text>
				<Stack
					width={18}
					height={18}
					backgroundColor="#0694D3"
					borderRadius="100%"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<ChevronRight size={12} />
				</Stack>
			</Stack>
			<Stack display="flex" flexDirection="row" alignItems="center" gap={5}>
				<Text fontSize={40} fontWeight="500" lineHeight={26}>
					{hideTokenValue ? '****' : '$350,270'}
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
