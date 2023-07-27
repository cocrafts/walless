import type { ParserRules } from 'simple-markdown';
import { defaultRules } from 'simple-markdown';

import codeBlock from './codeBlock';
import del from './del';
import em from './em';
import heading from './heading';
import hr from './hr';
import image from './image';
import inlineCode from './inlineCode';
import link from './link';
import list from './list';
import paragraph from './paragraph';
import strong from './strong';
import text from './text';

const rules: ParserRules = {
	...defaultRules,
	paragraph,
	image,
	text,
	link,
	list,
	strong,
	em,
	hr,
	del,
	heading,
	inlineCode,
	codeBlock,
};

export default rules;
