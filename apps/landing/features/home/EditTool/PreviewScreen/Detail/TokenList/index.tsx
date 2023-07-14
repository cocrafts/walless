import type { FC } from 'react';
import { Fragment } from 'react';
import type { MetadataDocument } from '@walless/store';
import { ScrollView } from '@walless/ui';

import Separator from './Separator';
import TokenItem from './TokenItem';

interface Props {
	items: MetadataDocument[];
}

export const TokenList: FC<Props> = ({ items }) => {
	return (
		<ScrollView marginVertical={12}>
			{items.map((item, index) => {
				const isLast = index === items.length - 1;

				return (
					<Fragment key={item._id}>
						<TokenItem index={0} item={item} />
						{!isLast && <Separator />}
					</Fragment>
				);
			})}
		</ScrollView>
	);
};

export default TokenList;
