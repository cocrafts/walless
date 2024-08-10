import type { FC } from 'react';
import { useMemo } from 'react';
import type { Networks } from '@walless/core';
import { ArrowBottomRight, ArrowTopRight, Plus, Swap } from '@walless/icons';
import WidgetButtons from 'components/WidgetButtons';
import type { WidgetButtonProps } from 'components/WidgetButtons/ButtonItem';
import { showReceiveModal } from 'modals/Receive';
import { showSendTokenModal } from 'modals/SendToken';
import { showSwapModal } from 'modals/Swap';
import { buyToken } from 'utils/buy';

interface Props {
	network: Networks;
	send: string;
	receive: string;
	buy: string;
	swap: string;
}

const FeatureButtons: FC<Props> = ({ buy, receive, send, swap, network }) => {
	const handlePressSend = () => {
		showSendTokenModal({ network });
	};

	const handlePressReceive = () => {
		showReceiveModal({ network });
	};

	const handlePressSwap = () => {
		showSwapModal({ network });
	};

	const handlePressBuy = () => {
		buyToken(network);
	};

	const widgetButtons: WidgetButtonProps[] = useMemo(() => {
		return [
			{
				title: 'Send',
				Icon: ArrowTopRight,
				style: {
					backgroundColor: send,
				},
				onPress: handlePressSend,
			},
			{
				title: 'Receive',
				Icon: ArrowBottomRight,
				style: {
					backgroundColor: receive,
				},
				onPress: handlePressReceive,
			},
			{
				title: 'Buy',
				Icon: Plus,
				style: {
					backgroundColor: buy,
				},
				onPress: handlePressBuy,
			},
			{
				title: 'Swap',
				Icon: Swap,
				style: {
					backgroundColor: swap,
				},
				onPress: handlePressSwap,
			},
		];
	}, []);

	return <WidgetButtons buttons={widgetButtons} />;
};

export default FeatureButtons;
