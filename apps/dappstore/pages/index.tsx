import { type FC } from 'react';
import HomeLayout from 'components/layouts/HomeLayout';
import LayoutSection from 'features/LayoutSection';
import WalletCustomizeSection from 'features/WalletCustomizeSection';

const IndexPage: FC = () => {
	return (
		<HomeLayout>
			<LayoutSection />
			<WalletCustomizeSection />
		</HomeLayout>
	);
};

export default IndexPage;
