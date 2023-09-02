import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  MongoDateTime: { input: any; output: any; }
  ObjectID: { input: any; output: any; }
  Uint32: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  createdAt?: Maybe<Scalars['MongoDateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectID']['output']>;
  identifier: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['MongoDateTime']['output']>;
};

export type JoinWaitlistResult = {
  __typename?: 'JoinWaitlistResult';
  count?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
};

export type Nonce = {
  __typename?: 'Nonce';
  identifier: Scalars['String']['output'];
  timestamp: Scalars['MongoDateTime']['output'];
  value: Scalars['Uint32']['output'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  addWidget?: Maybe<Widget>;
  claimWalletInvitation?: Maybe<Scalars['Boolean']['output']>;
  deleteWidget?: Maybe<Scalars['Boolean']['output']>;
  deleteWidgetAccount?: Maybe<Scalars['Boolean']['output']>;
  joinWaitlist?: Maybe<JoinWaitlistResult>;
  registerAccount?: Maybe<Account>;
  registerWidgetAccount?: Maybe<Account>;
  sendEmergencyKit?: Maybe<SendEmergencyKitResult>;
  updateWidgetStatus?: Maybe<Scalars['Boolean']['output']>;
};


export type RootMutationAddWidgetArgs = {
  banner?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  largeLogo?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  networks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nfts?: InputMaybe<Array<InputMaybe<WidgetTokenInput>>>;
  tokens?: InputMaybe<Array<InputMaybe<WidgetTokenInput>>>;
  userId: Scalars['String']['input'];
};


export type RootMutationClaimWalletInvitationArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type RootMutationDeleteWidgetArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDeleteWidgetAccountArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationJoinWaitlistArgs = {
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  twitter: Scalars['String']['input'];
};


export type RootMutationRegisterAccountArgs = {
  key: Scalars['String']['input'];
};


export type RootMutationRegisterWidgetAccountArgs = {
  email: Scalars['String']['input'];
  pubkey: Scalars['String']['input'];
};


export type RootMutationSendEmergencyKitArgs = {
  key: Scalars['String']['input'];
};


export type RootMutationUpdateWidgetStatusArgs = {
  id: Scalars['String']['input'];
  status: WidgetStatus;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  counter?: Maybe<Scalars['Int']['output']>;
  greeting?: Maybe<Scalars['String']['output']>;
  loginMessage?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Nonce>;
  nonces?: Maybe<Array<Maybe<Nonce>>>;
  systemInfo?: Maybe<SystemInfo>;
  token?: Maybe<TokenInfo>;
  tokenByAddress?: Maybe<TokenInfo>;
  tokens?: Maybe<Array<Maybe<TokenInfo>>>;
  tokensByAddress?: Maybe<Array<Maybe<TokenInfo>>>;
  walletInvitation?: Maybe<WalletInvitation>;
  widget?: Maybe<Widget>;
  widgetAccount?: Maybe<WidgetAccount>;
  widgetAccountByPubkey?: Maybe<WidgetAccount>;
  widgetAccounts?: Maybe<Array<Maybe<WidgetAccount>>>;
  widgets?: Maybe<Array<Maybe<Widget>>>;
  widgetsByStatus?: Maybe<Array<Maybe<Widget>>>;
};


export type RootQueryLoginMessageArgs = {
  pubkey: Scalars['String']['input'];
};


export type RootQueryNonceArgs = {
  identifier: Scalars['String']['input'];
};


export type RootQueryTokenArgs = {
  id: Scalars['String']['input'];
};


export type RootQueryTokenByAddressArgs = {
  address: Scalars['String']['input'];
};


export type RootQueryTokensArgs = {
  ids: Array<InputMaybe<Scalars['String']['input']>>;
};


export type RootQueryTokensByAddressArgs = {
  addresses: Array<InputMaybe<Scalars['String']['input']>>;
};


export type RootQueryWalletInvitationArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryWidgetArgs = {
  id: Scalars['String']['input'];
};


export type RootQueryWidgetAccountArgs = {
  id: Scalars['String']['input'];
};


export type RootQueryWidgetAccountByPubkeyArgs = {
  pubkey: Scalars['String']['input'];
};


export type RootQueryWidgetsByStatusArgs = {
  status: WidgetStatus;
};

export type SendEmergencyKitResult = {
  __typename?: 'SendEmergencyKitResult';
  messageId?: Maybe<Scalars['String']['output']>;
};

export type SystemInfo = {
  __typename?: 'SystemInfo';
  environment?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type Token = {
  __typename?: 'Token';
  address: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
};

export type TokenInfo = {
  __typename?: 'TokenInfo';
  address?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  platforms: Scalars['JSON']['output'];
  quotes: Scalars['JSON']['output'];
  symbol: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type WalletInvitation = {
  __typename?: 'WalletInvitation';
  code?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectID']['output']>;
  timestamp?: Maybe<Scalars['MongoDateTime']['output']>;
};

export type Widget = {
  __typename?: 'Widget';
  banner?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectID']['output']>;
  largeLogo?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  networks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  nfts?: Maybe<Array<Maybe<Token>>>;
  status?: Maybe<WidgetStatus>;
  tokens?: Maybe<Array<Maybe<Token>>>;
};

export type WidgetAccount = {
  __typename?: 'WidgetAccount';
  createdAt?: Maybe<Scalars['MongoDateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectID']['output']>;
  identifier: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['MongoDateTime']['output']>;
};

export enum WidgetStatus {
  Accepted = 'ACCEPTED',
  InReview = 'IN_REVIEW',
  Rejected = 'REJECTED'
}

export type WidgetTokenInput = {
  address: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  JoinWaitlistResult: ResolverTypeWrapper<JoinWaitlistResult>;
  MongoDateTime: ResolverTypeWrapper<Scalars['MongoDateTime']['output']>;
  Nonce: ResolverTypeWrapper<Nonce>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  RootMutation: ResolverTypeWrapper<{}>;
  RootQuery: ResolverTypeWrapper<{}>;
  SendEmergencyKitResult: ResolverTypeWrapper<SendEmergencyKitResult>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SystemInfo: ResolverTypeWrapper<SystemInfo>;
  Token: ResolverTypeWrapper<Token>;
  TokenInfo: ResolverTypeWrapper<TokenInfo>;
  Uint32: ResolverTypeWrapper<Scalars['Uint32']['output']>;
  WalletInvitation: ResolverTypeWrapper<WalletInvitation>;
  Widget: ResolverTypeWrapper<Widget>;
  WidgetAccount: ResolverTypeWrapper<WidgetAccount>;
  WidgetStatus: WidgetStatus;
  WidgetTokenInput: WidgetTokenInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  JoinWaitlistResult: JoinWaitlistResult;
  MongoDateTime: Scalars['MongoDateTime']['output'];
  Nonce: Nonce;
  ObjectID: Scalars['ObjectID']['output'];
  RootMutation: {};
  RootQuery: {};
  SendEmergencyKitResult: SendEmergencyKitResult;
  String: Scalars['String']['output'];
  SystemInfo: SystemInfo;
  Token: Token;
  TokenInfo: TokenInfo;
  Uint32: Scalars['Uint32']['output'];
  WalletInvitation: WalletInvitation;
  Widget: Widget;
  WidgetAccount: WidgetAccount;
  WidgetTokenInput: WidgetTokenInput;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['MongoDateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['MongoDateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type JoinWaitlistResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['JoinWaitlistResult'] = ResolversParentTypes['JoinWaitlistResult']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MongoDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MongoDateTime'], any> {
  name: 'MongoDateTime';
}

export type NonceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Nonce'] = ResolversParentTypes['Nonce']> = {
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['MongoDateTime'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Uint32'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type RootMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootMutation'] = ResolversParentTypes['RootMutation']> = {
  addWidget?: Resolver<Maybe<ResolversTypes['Widget']>, ParentType, ContextType, RequireFields<RootMutationAddWidgetArgs, 'description' | 'name' | 'networks' | 'userId'>>;
  claimWalletInvitation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<RootMutationClaimWalletInvitationArgs, 'code' | 'email'>>;
  deleteWidget?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<RootMutationDeleteWidgetArgs, 'id'>>;
  deleteWidgetAccount?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<RootMutationDeleteWidgetAccountArgs, 'id'>>;
  joinWaitlist?: Resolver<Maybe<ResolversTypes['JoinWaitlistResult']>, ParentType, ContextType, RequireFields<RootMutationJoinWaitlistArgs, 'description' | 'email' | 'twitter'>>;
  registerAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<RootMutationRegisterAccountArgs, 'key'>>;
  registerWidgetAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<RootMutationRegisterWidgetAccountArgs, 'email' | 'pubkey'>>;
  sendEmergencyKit?: Resolver<Maybe<ResolversTypes['SendEmergencyKitResult']>, ParentType, ContextType, RequireFields<RootMutationSendEmergencyKitArgs, 'key'>>;
  updateWidgetStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<RootMutationUpdateWidgetStatusArgs, 'id' | 'status'>>;
};

export type RootQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootQuery'] = ResolversParentTypes['RootQuery']> = {
  counter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  greeting?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loginMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<RootQueryLoginMessageArgs, 'pubkey'>>;
  nonce?: Resolver<Maybe<ResolversTypes['Nonce']>, ParentType, ContextType, RequireFields<RootQueryNonceArgs, 'identifier'>>;
  nonces?: Resolver<Maybe<Array<Maybe<ResolversTypes['Nonce']>>>, ParentType, ContextType>;
  systemInfo?: Resolver<Maybe<ResolversTypes['SystemInfo']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['TokenInfo']>, ParentType, ContextType, RequireFields<RootQueryTokenArgs, 'id'>>;
  tokenByAddress?: Resolver<Maybe<ResolversTypes['TokenInfo']>, ParentType, ContextType, RequireFields<RootQueryTokenByAddressArgs, 'address'>>;
  tokens?: Resolver<Maybe<Array<Maybe<ResolversTypes['TokenInfo']>>>, ParentType, ContextType, RequireFields<RootQueryTokensArgs, 'ids'>>;
  tokensByAddress?: Resolver<Maybe<Array<Maybe<ResolversTypes['TokenInfo']>>>, ParentType, ContextType, RequireFields<RootQueryTokensByAddressArgs, 'addresses'>>;
  walletInvitation?: Resolver<Maybe<ResolversTypes['WalletInvitation']>, ParentType, ContextType, Partial<RootQueryWalletInvitationArgs>>;
  widget?: Resolver<Maybe<ResolversTypes['Widget']>, ParentType, ContextType, RequireFields<RootQueryWidgetArgs, 'id'>>;
  widgetAccount?: Resolver<Maybe<ResolversTypes['WidgetAccount']>, ParentType, ContextType, RequireFields<RootQueryWidgetAccountArgs, 'id'>>;
  widgetAccountByPubkey?: Resolver<Maybe<ResolversTypes['WidgetAccount']>, ParentType, ContextType, RequireFields<RootQueryWidgetAccountByPubkeyArgs, 'pubkey'>>;
  widgetAccounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['WidgetAccount']>>>, ParentType, ContextType>;
  widgets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Widget']>>>, ParentType, ContextType>;
  widgetsByStatus?: Resolver<Maybe<Array<Maybe<ResolversTypes['Widget']>>>, ParentType, ContextType, RequireFields<RootQueryWidgetsByStatusArgs, 'status'>>;
};

export type SendEmergencyKitResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendEmergencyKitResult'] = ResolversParentTypes['SendEmergencyKitResult']> = {
  messageId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SystemInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SystemInfo'] = ResolversParentTypes['SystemInfo']> = {
  environment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenInfo'] = ResolversParentTypes['TokenInfo']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  platforms?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  quotes?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Uint32ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Uint32'], any> {
  name: 'Uint32';
}

export type WalletInvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletInvitation'] = ResolversParentTypes['WalletInvitation']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['MongoDateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Widget'] = ResolversParentTypes['Widget']> = {
  banner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  largeLogo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  networks?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  nfts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Token']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['WidgetStatus']>, ParentType, ContextType>;
  tokens?: Resolver<Maybe<Array<Maybe<ResolversTypes['Token']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetAccount'] = ResolversParentTypes['WidgetAccount']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['MongoDateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['MongoDateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JoinWaitlistResult?: JoinWaitlistResultResolvers<ContextType>;
  MongoDateTime?: GraphQLScalarType;
  Nonce?: NonceResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  RootMutation?: RootMutationResolvers<ContextType>;
  RootQuery?: RootQueryResolvers<ContextType>;
  SendEmergencyKitResult?: SendEmergencyKitResultResolvers<ContextType>;
  SystemInfo?: SystemInfoResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  TokenInfo?: TokenInfoResolvers<ContextType>;
  Uint32?: GraphQLScalarType;
  WalletInvitation?: WalletInvitationResolvers<ContextType>;
  Widget?: WidgetResolvers<ContextType>;
  WidgetAccount?: WidgetAccountResolvers<ContextType>;
};

