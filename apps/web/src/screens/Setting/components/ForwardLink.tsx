import { type FC } from 'react';
import { ArrowTopRight } from '@walless/icons';
import { Anchor, Button, Stack, Text } from '@walless/ui';

interface Props {
	link: string;
	title: string;
	icon?: React.ReactNode;
	iconBackground?: string;
}

const ForwardLink: FC<Props> = ({ link, title, icon, iconBackground }) => {
	return (
		<Anchor href={link} target="_blank">
			<Button
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				backgroundColor="transparent"
				padding={12}
				hoverStyle={{ backgroundColor: '#202D38' }}
			>
				<Stack flexDirection="row" alignItems="center" gap={12}>
					{icon && (
						<Stack
							backgroundColor={iconBackground ?? '#202D38'}
							width={30}
							height={30}
							borderRadius={8}
							alignItems="center"
							justifyContent="center"
						>
							{icon}
						</Stack>
					)}

					<Text>{title}</Text>
				</Stack>

				<ArrowTopRight size={16} />
			</Button>
		</Anchor>
	);
};

export default ForwardLink;
