import { Stack } from '@walless/gui';

import BottomPart from './BottomPart';
import Delimiter from './Delimiter';
import UpperPart from './UpperPart';

const Footer = () => {
	return (
		<Stack
			backgroundColor="#131B22"
			alignItems="center"
			paddingVertical={36}
			$gtMd={{
				paddingHorizontal: 48,
				paddingVertical: 72,
			}}
		>
			<UpperPart />
			<Delimiter />
			<BottomPart />
		</Stack>
	);
};

export default Footer;
