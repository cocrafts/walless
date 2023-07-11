import type { FC } from 'react';
import { Stack } from '@walless/ui';
import { ProjectTool } from 'features/home/EditTool/internal';
import { appState, editToolActions } from 'state/app';
import { useSnapshot } from 'valtio';

import TextLimit from '../components/TextLimit';
import ToolDescription from '../components/ToolDescription';

const EditProjectDesc: FC = () => {
	const projectSnap = useSnapshot(appState.tools.project);
	const maxLength = 100;
	const onTarget = () => editToolActions.setTarget(ProjectTool.description);

	return (
		<Stack
			gap={10}
			onHoverIn={onTarget}
			onHoverOut={editToolActions.unsetTarget}
		>
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<ToolDescription
					name="Description"
					description="A short, concise and sharp project introduction to understand easily"
				/>
				<TextLimit current={projectSnap.description.length} limit={maxLength} />
			</Stack>

			<Stack
				backgroundColor="#19232C"
				padding={12}
				borderRadius={8}
				flexDirection="row"
				gap={4}
			>
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
			</Stack>
		</Stack>
	);
};

export default EditProjectDesc;
