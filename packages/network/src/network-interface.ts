export enum TokenType {
	SUI_TOKEN = 'SUI_TOKEN',
	SOLANA_TOKEN = 'SOLANA_TOKEN',
}

export interface Token {
	balance: string;
	symbol: string;
	name: string;
	type: TokenType;

	tokenAccounts?;
}
