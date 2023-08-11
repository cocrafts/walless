import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LayoutPage = () => {
	const router = useRouter();

	useEffect(() => {
		router.replace('/');
	}, []);

	return null;
};

export default LayoutPage;
