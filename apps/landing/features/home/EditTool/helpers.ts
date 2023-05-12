import { type ChangeEvent } from 'react';

export const handleChangeImage = (
	event: ChangeEvent<HTMLInputElement>,
	callback: (url: string) => void,
) => {
	if (!event.target.files?.length) return;

	const reader = new FileReader();
	reader.onload = (e) => callback(e.target?.result as string);
	reader.readAsDataURL((event.target.files as FileList)[0]);
};
