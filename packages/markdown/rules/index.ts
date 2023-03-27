import { defaultRules, ParserRules } from 'simple-markdown';

import del from './del';
import em from './em';
import heading from './heading';
import image from './image';
import inlineCode from './inlineCode';
import list from './list';
import paragraph from './paragraph';
import strong from './strong';
import text from './text';

const rules: ParserRules = {
	...defaultRules,
	paragraph,
	image,
	text,
	list,
	strong,
	em,
	del,
	heading,
	inlineCode,
};

export default rules;
