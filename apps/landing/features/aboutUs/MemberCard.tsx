import type { FC } from 'react';
import { Fragment, useState } from 'react';
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
	size = 212,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const MAX_CARDS = 5;
	const containerStyle = {
		width: size,
		height: (size * 312) / 362,
	};

	const containerMarginStyle = {
		margin: (1200 - 36 - size * MAX_CARDS) / (MAX_CARDS * 2),
		borderRadius: size > 300 ? 20 : 12,
	};

	return (
		<Hoverable
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
			style={[styles.container, containerStyle, containerMarginStyle]}
		>
			<Image
				style={{
					objectFit: 'cover',
				}}
				src={avatar}
				alt=""
				width={size}
				height={(size * 312) / 362}
			/>
			{isHovered && (
				<View style={[styles.hoveredContainer, containerStyle]}>
					<View style={styles.imageBackground}>
						<Image
							src="/img/team/walless-logo-mask.svg"
							alt=""
							width={size}
							height={(size * 163) / 314}
						/>
					</View>

					<Fragment>
						<Text style={styles.nameText}>{name}</Text>
						<Text style={styles.smallText}>
							{positions.map((item) => {
								if (item === positions[0]) {
									return item;
								} else {
									return ` & ${item}`;
								}
							})}
						</Text>
					</Fragment>
					<View style={styles.separatedLine} />
					<Text ellipsizeMode="tail" numberOfLines={3} style={styles.smallText}>
						{description}
					</Text>
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
	},
	hoveredContainer: {
		position: 'absolute',
		backgroundColor: '#19A3E1',
		justifyContent: 'flex-end',
		paddingHorizontal: 12,
		paddingBottom: 12,
		gap: 8,
	},
	socialContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	nameText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#ffffff',
	},
	smallText: {
		fontSize: 12,
		color: '#ffffff',
	},
	separatedLine: {
		width: '100%',
		height: 1,
		backgroundColor: '#ffffff',
	},
	imageBackground: {
		position: 'absolute',
		bottom: -6,
		right: -46,
	},
});
