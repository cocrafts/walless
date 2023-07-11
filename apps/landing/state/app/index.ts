import { type MetadataDocument } from '@walless/store';
import { type Target } from 'features/home/EditTool/internal';

import { appState } from './internal';

export const editToolActions = {
	setTarget: (target: Target) => {
		appState.tools.target = target;
	},
	unsetTarget: () => {
		appState.tools.target = null;
	},
	setProjectName: (name: string) => {
		appState.tools.project.name = name;
	},
	setProjectDescription: (description: string) => {
		appState.tools.project.description = description;
	},
	setProjectLogo: (logo: string) => {
		appState.tools.project.logo = logo;
	},
	setProjectBanner: (banner: string) => {
		appState.tools.project.banner = banner;
	},
	setDetailToken: (tokenMetadata: MetadataDocument) => {
		appState.tools.detail.tokens[tokenMetadata._id] = tokenMetadata;
	},
	deleteDetailToken: (id: string) => {
		delete appState.tools.detail.tokens[id];
	},
	setDetailCollectible: (collectibleMetadata: MetadataDocument) => {
		appState.tools.detail.collectibles[collectibleMetadata._id] =
			collectibleMetadata;
	},
	deleteDetailCollectible: (id: string) => {
		delete appState.tools.detail.collectibles[id];
	},
	setDetailIcon: (icon: string) => {
		appState.tools.detail.icon = icon;
	},
};

export * from './internal';
