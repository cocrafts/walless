import type {
	MoveValue,
	PaginatedObjectsResponse,
	SuiClient,
	SuiObjectData,
} from '@mysten/sui.js/client';
import type { SuiNft } from '@walless/core';
import { Networks } from '@walless/core';
import type { NftDocument } from '@walless/store';

export const getSuiCollectibles = async (client: SuiClient, owner: string) => {
	const nftDocuments: NftDocument<SuiNft>[] = [];
	let objectResponses: PaginatedObjectsResponse['data'] = [];
	let cursor: PaginatedObjectsResponse['nextCursor'] | undefined;
	while (cursor !== null) {
		const allOwnedObjects = await client.getOwnedObjects({
			owner,
			cursor,
			options: {
				showType: true,
				showOwner: true,
				showDisplay: true,
				showContent: true,
			},
		});

		objectResponses = [...objectResponses, ...allOwnedObjects.data];

		if (allOwnedObjects.hasNextPage && cursor !== allOwnedObjects.nextCursor) {
			cursor = allOwnedObjects.nextCursor;
		} else {
			cursor = null;
		}
	}

	objectResponses
		.filter((obj) => obj.data && isCollectible(obj.data))
		.forEach((obj) => {
			const nft = constructNftDocument(obj.data!, owner);
			if (nft) nftDocuments.push(nft);
		});

	return nftDocuments;
};

const constructNftDocument = (
	obj: SuiObjectData,
	owner: string,
): NftDocument<SuiNft> | undefined => {
	if (obj.display?.data && typeof obj.display.data === 'object') {
		const collectibleId = `${owner}/${obj.objectId}`;

		return {
			_id: collectibleId,
			network: Networks.sui,
			cluster: 'Unknown',
			type: 'NFT',
			name: obj.display.data.name || 'Unknown',
			image: obj.display.data.image_url || 'Unknown',
			amount: 1, // TODO: need to verify nft amount on Sui
			objectId: obj.objectId,
			owner,
		};
	}
};

const isCollectible = (obj: SuiObjectData): boolean => {
	if (!obj) return false;

	if (isCollection(obj)) {
		return true;
	}

	const haveDisplayMetadata =
		obj.display?.data &&
		typeof obj.display.data === 'object' &&
		obj.display.data.url;

	if (haveDisplayMetadata) return true;

	const fields = (obj.content as never)['fields'] as {
		[key: string]: MoveValue;
	};

	const haveMetadataFields = obj.content && fields.url && !fields.ticket_id;
	if (haveMetadataFields) {
		return true;
	}

	return false;
};

const isCollection = (obj: SuiObjectData): boolean => {
	obj.content;
	const fields = (obj.content as never)['fields'] as {
		[key: string]: MoveValue;
	};

	return !!(obj.content && fields && fields.logical_owner && fields.bag);
};
