import { FC } from 'react';
import { Times } from '@walless/icons';
import { Stack, Text } from '@walless/ui';
import { Button } from '@walless/ui';

export interface PasscodeError {
	errorCode?: number;
	errorMessage?: string;
	count: number;
}

interface Props {
	error: PasscodeError;
}

export const Warning: FC<Props> = ({ error }) => {
	const { errorCode, errorMessage } = error;

	return (
		<Stack
			position="absolute"
			top={0}
			left={0}
			right={0}
			backgroundColor="$warning"
			animation="medium"
		>
			<Stack alignItems="flex-end">
				<Button
					position="absolute"
					top={0}
					right={0}
					backgroundColor={'transparent'}
					borderColor={'transparent'}
					padding={0}
					paddingTop={10}
					paddingRight={10}
				>
					<Times size={14} />
				</Button>
			</Stack>
			<Text textAlign="center" paddingVertical={15} color="#FFFFFF">
				{`code ${errorCode}: ${errorMessage}`}
			</Text>
		</Stack>
	);
};

export default Warning;
