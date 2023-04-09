import { FC } from 'react';
import { Image, Stack, Text } from '@walless/gui';

interface Props {
	infoKey: string;
	infoValue: string;
	infoValueLogo?: string;
}

const InfoKeyValue: FC<Props> = ({ infoKey, infoValue, infoValueLogo }) => {
	return (
		<Stack
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			padding={20}
		>
			<Text fontSize={14} fontWeight="500">
				{infoKey}
			</Text>

			<Stack display="flex" flexDirection="row" alignItems="center" gap={8}>
				<Stack maxWidth={120} overflow="hidden">
					<Text
						fontSize={14}
						fontWeight="500"
						color="#566674"
						wordWrap="unset"
						textOverflow="ellipsis"
					>
						{infoValue}
					</Text>
				</Stack>

				{infoValueLogo && (
					<Stack width={25} height={25} borderRadius="100%" overflow="hidden">
						<Image src={infoValueLogo} width="100%" height="100%" />
					</Stack>
				)}
			</Stack>
		</Stack>
	);
};

export default InfoKeyValue;
