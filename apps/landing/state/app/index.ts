import { appState } from './internal';

export const editToolActions = {
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
};

export * from './internal';
