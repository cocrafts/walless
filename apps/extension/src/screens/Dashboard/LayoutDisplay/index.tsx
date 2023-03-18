import React, { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { View } from '@walless/ui';
import { useSnapshot } from 'utils/hook';
import { layoutProxy } from 'utils/state/layout';
import { LayoutItem } from 'utils/state/layout/type';

interface LoaderData {
	params: {
		layoutId: string;
	};
	project: LayoutItem;
}

export const LayoutDisplay: React.FC = () => {
	const navigate = useNavigate();
	const layout = useSnapshot(layoutProxy);
	const {
		params,
		project: { projectLayout },
	} = useLoaderData() as LoaderData;
	const Component = projectLayout;

	useEffect(() => {
		if (layout[params.layoutId]) {
			return;
		}
		navigate('/');
	}, [layout]);

	return (
		<View className="flex-1">
			<Component />
		</View>
	);
};

export default LayoutDisplay;
