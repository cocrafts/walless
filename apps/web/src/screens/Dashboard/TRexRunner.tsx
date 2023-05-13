import { View } from '@walless/gui';

export const TRexRunner = () => {
	return (
		<View style={{ width: 352, height: 600, justifyContent: 'center' }}>
			<iframe
				src="https://cdn.stormgate.io/documents/runner/index.html"
				width={352}
				height={300}
				style={{ borderColor: 'transparent' }}
			/>
		</View>
	);
};
