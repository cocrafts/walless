import { FC } from 'react';

interface Props {
	children: React.ReactNode;
}

const ContextMenuContainer: FC<Props> = ({ children }) => {
	return <div>{children}</div>;
};

export default ContextMenuContainer;
