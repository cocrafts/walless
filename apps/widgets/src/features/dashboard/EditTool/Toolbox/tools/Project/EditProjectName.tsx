import type { FC } from 'react';
import { Input, View } from '@walless/gui';
import { Bookmark } from '@walless/icons';
import { appState } from 'state/tool';
import { useSnapshot } from 'valtio';

import TextLimit from '../components/TextLimit';
import ToolDescription from '../components/ToolDescription';

const EditProjectName: FC = () => {
	const projectSnap = useSnapshot(appState.tools.project);
	const maxLength = 40;

	return (
		<View>
			<View horizontal>
				<ToolDescription
					name="Project name"
					description="Your Project name in short"
				/>
				<TextLimit current={projectSnap.name.length} limit={maxLength} />
			</View>

			<View horizontal>
				<Bookmark color="#566674" />
				<Input />
			</View>
		</View>
	);
};

export default EditProjectName;
