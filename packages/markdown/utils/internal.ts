import type { SingleASTNode } from 'simple-markdown';
import { outputFor, parserFor } from 'simple-markdown';

import rules from '../rules';

export const universalParser = parserFor(rules);
export const parse = (source: string): SingleASTNode[] => {
	return universalParser(`${source}\n\n`, { inline: false });
};
export const reactOutput = outputFor(rules, 'react' as never);
