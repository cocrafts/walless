import { Workbox } from 'workbox-window';

export default function registerServiceWorker() {
	if (ENV === 'production' && 'serviceWorker' in navigator) {
		const workbox = new Workbox('worker.js');

		workbox.addEventListener('installed', (event) => {
			if (event.isUpdate) {
				if (confirm('Update available. Reload now?')) {
					window.location.reload();
				}
			}
		});

		workbox.register();
	}
}
