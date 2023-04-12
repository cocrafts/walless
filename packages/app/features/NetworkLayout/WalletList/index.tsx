import { FC, useEffect, useRef, useState } from 'react';
import { LayoutRectangle } from 'react-native';
import { ScrollView } from 'react-native';

import { WalletCard } from '../WalletCard';

type Wallet = {
	address: string;
	balance: number;
};

interface Props {
	activeIndex?: number;
	wallets: Wallet[];
	backgroundSrc?: string;
	iconSrc?: string;
}

export const WalletList: FC<Props> = ({
	activeIndex = 0,
	wallets,
	backgroundSrc,
	iconSrc,
}) => {
	const scrollRef = useRef<ScrollView>(null);
	const [cardWidth, setCardWidth] = useState(0);
	const [cardLayout, setCardLayout] = useState<LayoutRectangle>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	const getCardLayout = (layout: LayoutRectangle) => {
		setCardLayout(layout);
	};

	useEffect(() => {
		setCardWidth(cardLayout.width);
	}, [cardLayout]);

	useEffect(() => {
		scrollRef.current?.scrollTo({ x: activeIndex * cardWidth });
	}, [activeIndex]);

	return (
		<ScrollView
			ref={scrollRef}
			horizontal
			contentContainerStyle={{ paddingRight: 15 }}
			showsHorizontalScrollIndicator={false}
			scrollEnabled={false}
		>
			{wallets.map((wallet, index) => (
				<WalletCard
					key={index}
					index={index}
					backgroundSrc={backgroundSrc}
					iconSrc={iconSrc}
					address={wallet.address}
					balance={400}
					getCardLayout={getCardLayout}
				/>
			))}
		</ScrollView>
	);
};

export default WalletList;
