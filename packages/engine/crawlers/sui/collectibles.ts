import type {
	JsonRpcProvider,
	PaginatedObjectsResponse,
	SuiObjectData,
} from '@mysten/sui.js';
import { Networks } from '@walless/core';
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
		.filter((objResponse) => {
			if (objResponse.data) {
				return isCollectible(objResponse.data);
			}

			return false;
		})
		.forEach((objResponse) => {
			if (objResponse.data) {
				collectibleDocuments.push(
					getCollectibleDocument(objResponse.data, owner),
				);
			}
		});

	return collectibleDocuments;
};

const getCollectibleDocument = (
	objResponse: SuiObjectData,
	owner: string,
): CollectibleDocument => {
	const collectibleId = `${owner}/${objResponse.objectId}`;
	const formatMetadata = () => {
		const metadata: CollectibleDocument['metadata'] = {
			name: 'Unknown',
			imageUri: 'Unknown',
			description: 'Unknown',
			sod: objResponse,
		};
		if (
			objResponse.display?.data &&
			typeof objResponse.display.data === 'object'
		) {
			const objectDisplay = objResponse.display.data;
			if ('name' in objectDisplay) {
				metadata.name = objectDisplay.name;
			}

			if ('image_url' in objectDisplay) {
				metadata.imageUri = objectDisplay.image_url;
			}

			if ('description' in objectDisplay) {
				metadata.description = objectDisplay.description;
			}
		}

		return metadata;
	};

	return {
		_id: collectibleId,
		collectionId: 'Unknown',
		account: {
			mint: objResponse.objectId,
			owner,
			amount: 1,
		},
		network: Networks.sui,
		type: 'NFT',
		metadata: formatMetadata(),
	};
};

const isCollectible = (suiObject: SuiObjectData): boolean => {
	if (isCollection(suiObject)) {
		return true;
	}

	let url: string | undefined;
	if (
		suiObject.display?.data &&
		typeof suiObject.display.data === 'object' &&
		('image_url' in suiObject.display.data ||
			'img_url' in suiObject.display.data ||
			'url' in suiObject.display.data)
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
		'url' in suiObject.content.fields &&
		!('ticket_id' in suiObject.content.fields)
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
		'logical_owner' in suiObject.content.fields &&
		'bag' in suiObject.content.fields
	);
};
