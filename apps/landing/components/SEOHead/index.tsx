import type { FC } from 'react';
import Head from 'next/head';

import globalMeta from './globalMeta';

export interface SEOHeadProps {
	title?: string;
	description?: string;
	keywords?: string;
	url?: string;
	image?: string;
}

const SEOHead: FC<SEOHeadProps> = ({
	title = globalMeta.siteName,
	description = globalMeta.description,
	keywords = globalMeta.keywords,
	url = globalMeta.siteUrl,
	image = globalMeta.siteImage,
}) => {
	return (
		<Head>
			<title>{title}</title>
			<link rel="canonical" href={url} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta property="og:title" content={title} />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={image} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="627" />
			<meta property="twitter:image" content={image} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:site_name" content={title} />
			<meta property="og:locale" content="en_US" />
		</Head>
	);
};

export default SEOHead;
