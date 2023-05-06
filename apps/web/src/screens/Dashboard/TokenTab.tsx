import { type FC } from 'react';
import { TokenList } from '@walless/app';

export const TokenTab: FC = () => {
	return (
		<TokenList
			contentContainerStyle={{ borderRadius: 15, overflow: 'hidden' }}
		/>
	);
};

export default TokenTab;
