/*
 * This is the function that help popup establish a connect to background script
 * It's help to detect window close event under kernel
 */
export const initializeKernelConnect = (portName: string) => {
	chrome.runtime.connect({ name: portName });
};
