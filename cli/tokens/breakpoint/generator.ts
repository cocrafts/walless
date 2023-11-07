import { writeFileSync, copyFileSync } from 'fs';

const generate = (amount = 100) => {
  const config = {
    tokenStandard: 'nft',
    number: amount,
    symbol: 'WALLESS',
    sellerFeeBasisPoints: 500,
    isMutable: true,
    isSequential: false,
    creators: [
      {
        address: 'VTJahmvMCTxcBUzgaQtcA7BXWya7Ab4BWAjXLv2tXHc',
        share: 100
      }
    ],
    uploadMethod: 'aws',
    ruleSet: null,
    awsConfig: {
      bucket: 'metacraft-cdn',
      profile: 'default',
      directory: 'walless/nfts',
      domain: 'https://cdn.stormgate.io'
    },
    sdriveApiKey: null,
    nftStorageAuthToken: null,
    shdwStorageAccount: null,
    pinataConfig: null,
    hiddenSettings: null,
    guards: null,
    maxEditionSupply: null
  }

  const collection = {
    name: 'Walless 2023',
    symbol: 'WALLESS',
    description: 'Walless',
    image: 'collection.png',
    attributes: [],
    properties: {
      files: [
        {
          uri: 'collection.png',
          type: 'image/png',
        }
      ],
    }
  };

  writeFileSync('./cli/tokens/breakpoint/config.json', JSON.stringify(config));
  writeFileSync('./cli/tokens/breakpoint/assets/collection.json', JSON.stringify(collection));
  copyFileSync('./cli/tokens/breakpoint/collection.png', `./cli/tokens/breakpoint/assets/collection.png`);

  for (let i = 0; i < amount; i += 1) {
    makeNFT(i);
  }
};

const makeNFT = (index: number) => {
	const data = {
		name:`WL #${String(index + 1).padStart(2, '0')}`,
		symbol: 'WALLESS',
    description: 'Walless',
		image: `${index}.png`,
		attributes: [
			{
				trait_type: 'Event',
				value: 'Breakpoint 2023',
			},
			{
				trait_type: 'Theme',
				value: 'Halloween',
			},
			{
				trait_type: 'Sponsored',
				value: 'Walless',
			},
		],
		properties: { 
			files: [
				{
					uri: `${index}.png`,
					type: 'image/png'
				}
			],
		},
	};

	writeFileSync(`./cli/tokens/breakpoint/assets/${index}.json`, JSON.stringify(data));
	copyFileSync('./cli/tokens/breakpoint/item.png', `./cli/tokens/breakpoint/assets/${index}.png`);
};

generate(50);
