import { FC } from 'react';

export interface ToolboxProps {
	tools: ToolboxItem[];
	activeTool: ToolboxItem;
	setActiveTool: (tool: ToolboxItem) => void;
}

export interface ToolboxItem {
	name: string;
	preview: FC;
	previewImage: string;
	components: FC[];
}

export enum ProjectTool {
	name,
	description,
	logo,
	banner,
}

export interface ProjectState {
	name: string;
	description: string;
	logo: string;
	banner: string;
}

export enum DetailTool {}

export type Target = ProjectTool | DetailTool | null;
