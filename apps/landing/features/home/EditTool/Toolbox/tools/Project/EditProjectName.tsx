import type { FC } from 'react';
import { Bookmark } from '@walless/icons';
import { Input, Stack } from '@walless/ui';
import { ProjectTool } from 'features/home/EditTool/internal';
import { appState, editToolActions } from 'state/app';
import { useSnapshot } from 'valtio';

import TextLimit from '../components/TextLimit';
import ToolDescription from '../components/ToolDescription';

const EditProjectName: FC = () => {
	const projectSnap = useSnapshot(appState.tools.project);
	const maxLength = 40;
	const onTarget = () => editToolActions.setTarget(ProjectTool.name);

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
					name="Project name"
					description="Your Project name in short"
				/>
				<TextLimit current={projectSnap.name.length} limit={maxLength} />
			</Stack>

			<Stack
				backgroundColor="#19232C"
				padding={12}
				borderRadius={8}
				flexDirection="row"
				alignItems="center"
				gap={4}
			>
				<Bookmark color="#566674" />
				<Input
					flex={1}
					padding={0}
					borderColor="transparent"
					focusStyle={{ borderColor: 'transparent' }}
					defaultValue={projectSnap.name}
					onChangeText={editToolActions.setProjectName}
					placeholder="Name your project"
					placeholderTextColor="#566674"
					maxLength={40}
				/>
			</Stack>
		</Stack>
	);
};

export default EditProjectName;
