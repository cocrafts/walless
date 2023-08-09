import type { FC } from 'react';
import { View } from '@walless/gui';
import { ProjectTool } from 'features/dashboard/EditTool/internal';
import { appState, editToolActions } from 'state/tool';
import { useSnapshot } from 'valtio';

import TextLimit from '../components/TextLimit';
import ToolDescription from '../components/ToolDescription';

const EditProjectDesc: FC = () => {
	const projectSnap = useSnapshot(appState.tools.project);
	const maxLength = 100;
	const onTarget = () => editToolActions.setTarget(ProjectTool.description);

	return (
		<View onTouchStart={onTarget} onTouchEnd={editToolActions.unsetTarget}>
			<View horizontal>
				<ToolDescription
					name="Description"
					description="A short, concise and sharp project introduction to understand easily"
				/>
				<TextLimit current={projectSnap.description.length} limit={maxLength} />
			</View>

			<View>
				<textarea
					rows={3}
					maxLength={maxLength}
					style={{
						flex: 1,
						fontSize: 14,
						fontFamily: 'Rubik',
						wordWrap: 'break-word',
					}}
					defaultValue={projectSnap.description}
					onChange={(e) => {
						editToolActions.setProjectDescription(e.target.value);
					}}
				/>
			</View>
		</View>
	);
};

export default EditProjectDesc;
