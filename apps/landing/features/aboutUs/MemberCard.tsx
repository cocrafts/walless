import { type FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import Image from 'next/image';

import type { SocialProps } from './Social';
import SocialCard from './Social';

export interface MemberProps {
	name: string;
	positions: string[];
	avatar: string;
	description: string;
	socials: SocialProps[];
	size?: number;
}

const MemberCard: FC<MemberProps> = ({
	name,
	positions,
	avatar,
	description,
	socials,
	size = 312,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const containerStyle = {
		width: size,
		height: size,
	};

	return (
		<Hoverable
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
			style={[styles.container, containerStyle]}
		>
			<Image src={avatar} alt="" width={size} height={size} />
			{isHovered && (
				<View style={[styles.hoveredContainer, containerStyle]}>
					<View style={styles.imageBackground}>
						<Image
							src="/img/blogs/hover-image.svg"
							alt=""
							width={((size / 2) * 471) / 258}
							height={size / 2}
						/>
					</View>
					<View>
						<Text style={styles.nameText}>{name}</Text>
						<Text style={styles.positionsText}>
							{positions.map((item) => {
								if (item === positions[0]) {
									return item;
								} else {
									return ` & ${item}`;
								}
							})}
						</Text>
					</View>
					<View style={styles.separatedLine} />
					<Text style={styles.positionsText}>{description}</Text>
					<View style={styles.socialContainer}>
						{socials.map((item, idx) => (
							<SocialCard key={idx} image={item.image} url={item.url} />
						))}
					</View>
				</View>
			)}
		</Hoverable>
	);
};

export default MemberCard;

const styles = StyleSheet.create({
	container: {
		borderRadius: 20,
		overflow: 'hidden',
		marginVertical: 10,
	},
	hoveredContainer: {
		position: 'absolute',
		backgroundColor: '#19A3E1',
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingBottom: 20,
		gap: 12,
	},
	socialContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	nameText: {
		fontSize: 20,
		fontWeight: '500',
		color: '#ffffff',
	},
	infoContainer: {
		alignSelf: 'flex-end',
	},
	positionsText: {
		color: '#ffffff',
	},
	separatedLine: {
		width: '100%',
		height: 1,
		backgroundColor: '#ffffff',
	},
	imageBackground: {
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
});
