import { Stack } from '@walless/ui';
import BulletSeparator from 'components/BulletSeparator';

import BottomPart from './BottomPart';
import UpperPart from './UpperPart';

const Footer = () => {
	return (
		<Stack
			backgroundColor="#131B22"
			paddingVertical={36}
			marginTop={64}
			$gtMd={{ paddingVertical: 72 }}
		>
			<UpperPart />
			<BulletSeparator marginVertical={36} marginHorizontal={18} />
			<BottomPart />
		</Stack>
	);
};

export default Footer;
