import { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgb(47, 47, 47)',
	},
	collectionContainer: {
		flex: 1,
	},
});

export const DynamicAppLayout: FC = () => {
	useEffect(() => {
		let runner: any;

		setTimeout(() => {
			runner = new global.Runner('.interstitial-wrapper');
		}, 200);

		return () => {
			console.log(runner);
		};
	}, []);

	return (
		<View style={styles.container}>
			<img
				id="offline-resources-1x"
				className="hidden"
				src="/runner/100-offline-sprite.png"
			/>
			<img
				id="offline-resources-2x"
				className="hidden"
				src="/runner/200-offline-sprite.png"
			/>
			<div
				style={{ marginTop: 50, minHeight: 150 }}
				id="main-frame-error"
				className="interstitial-wrapper"
			>
				<div id="main-content">
					<div className="icon icon-offline" alt=""></div>
				</div>
			</div>
			<View style={styles.collectionContainer}>
				<Text>Hello world!</Text>
			</View>
		</View>
	);
};

export default DynamicAppLayout;
