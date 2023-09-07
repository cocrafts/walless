import type { FC } from 'react';
import { Fragment } from 'react';
import { ScrollView } from 'react-native';
import type { MetadataDocument } from '@walless/store';

import Separator from './Separator';
import TokenItem from './TokenItem';

interface Props {
	items: MetadataDocument[];
}

export const TokenList: FC<Props> = ({ items }) => {
	return (
		<ScrollView>
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
