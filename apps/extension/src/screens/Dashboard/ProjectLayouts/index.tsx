import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { View } from '@walless/ui';
import { LayoutItem } from 'utils/state/layout/type';

export const ProjectLayouts: React.FC = () => {
	const { projectLayout } = useLoaderData() as LayoutItem;
	const Component = projectLayout;

	return (
		<View className="flex-1">
			<Component />
		</View>
	);
};

export default ProjectLayouts;
