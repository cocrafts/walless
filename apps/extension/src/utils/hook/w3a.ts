import { useEffect } from 'react';
import { customAuth } from 'utils/w3a';

export const useW3a = () => {
	useEffect(() => {
		const init = async () => {
			try {
				await customAuth.init({ skipSw: true, skipPrefetch: true });
			} catch (error) {
				console.error(error);
			}
		};

		init();
	}, []);
};
