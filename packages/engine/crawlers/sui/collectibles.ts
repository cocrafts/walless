import type {
	JsonRpcProvider,
	PaginatedObjectsResponse,
	SuiObjectData,
} from '@mysten/sui.js';
import { Networks } from '@walless/core';
import type { AssetMetadata } from '@walless/core';
import type { CollectibleDocument } from '@walless/store';

export const getSuiCollectibles = async (
	connection: JsonRpcProvider,
	owner: string,
) => {
	const collectibleDocuments: CollectibleDocument[] = [];
	let objectResponses: PaginatedObjectsResponse['data'] = [];
	let cursor: PaginatedObjectsResponse['nextCursor'] | undefined;
	while (cursor !== null) {
		const allOwnedObjects = await connection.getOwnedObjects({
			owner: '0x2cb9a508ecf7b9aacd4f50fca38e647050a13a660d92c9662ef1f2d5260595d8',
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
		.filter((objResponse) => isCollectible(objResponse.data))
		.forEach((objResponse) => {
				collectibleDocuments.push(
					getCollectibleDocument(objResponse.data!, owner),
				);		
		});

	return collectibleDocuments;
};

const getCollectibleDocument = (
	objResponse: SuiObjectData,
	owner: string,
): CollectibleDocument => {
	const collectibleId = `${owner}/${objResponse.objectId}`;
    const metadata: AssetMetadata = {
        sod: objResponse,
    };

    if (
        objResponse.display?.data &&
        typeof objResponse.display.data === 'object'
    ) {
        const objectDisplay = objResponse.display.data;
        metadata.name = objectDisplay.name || 'Unknown'
        metadata.imageUri = objectDisplay.image_url || 'Unknown'
        metadata.description = objectDisplay.description || 'Unknown'
    }

	return {
		_id: collectibleId,
        // TODO: research Sui nft collection
		collectionId: 'Unknown',
		account: {
			mint: objResponse.objectId,
			owner,
			amount: 1,
		},
		network: Networks.sui,
		type: 'NFT',
		metadata,
	};
};

const isCollectible = (suiObject: SuiObjectData | undefined): boolean => {
	if (!suiObject) return false;

    if (isCollection(suiObject)) {
		return true;
	}

	let url: string | undefined;
	if (
		suiObject.display?.data &&
		typeof suiObject.display.data === 'object' &&
        (suiObject.display.data.image_url || suiObject.display.data.img_url || suiObject.display.data.url)
	) {
		url =
			suiObject.display.data.image_url ??
			suiObject.display.data.img_url ??
			suiObject.display.data.url;
	}

	if (
		!url &&
		!!suiObject.content &&
		'fields' in suiObject.content &&
		suiObject.content.fields.url &&
		!suiObject.content.fields.ticket_id
	) {
		url =
			suiObject.content.fields.url &&
			typeof suiObject.content.fields.url === 'string'
				? suiObject.content.fields.url
				: undefined;
	}

	if (url) return true;

	return false;
};

const isCollection = (suiObject: SuiObjectData): boolean => {
	return (
		!!suiObject.content &&
		'fields' in suiObject.content &&
		suiObject.content.fields.logical_owner &&
		suiObject.content.fields.bag
	);
};
