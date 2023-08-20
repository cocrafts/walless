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

export type Project = {
  __typename?: 'Project';
  banner?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  detailIcon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectID']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  networks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  nfts?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tokens?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  addProject?: Maybe<Project>;
  addUser?: Maybe<User>;
  claimWalletInvitation?: Maybe<Scalars['Boolean']['output']>;
  joinWaitlist?: Maybe<JoinWaitlistResult>;
  registerAccount?: Maybe<Account>;
  sendEmergencyKit?: Maybe<SendEmergencyKitResult>;
};


export type RootMutationAddProjectArgs = {
  banner?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  detailIcon?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  networks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nfts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokens?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId: Scalars['String']['input'];
};


export type RootMutationAddUserArgs = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type RootMutationClaimWalletInvitationArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type RootMutationJoinWaitlistArgs = {
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  twitter: Scalars['String']['input'];
};


export type RootMutationRegisterAccountArgs = {
  key: Scalars['String']['input'];
};


export type RootMutationSendEmergencyKitArgs = {
  key: Scalars['String']['input'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  counter?: Maybe<Scalars['Int']['output']>;
  greeting?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
  systemInfo?: Maybe<SystemInfo>;
  token?: Maybe<TokenInfo>;
  tokens?: Maybe<Array<Maybe<TokenInfo>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  walletInvitation?: Maybe<WalletInvitation>;
};


export type RootQueryProjectArgs = {
  id: Scalars['String']['input'];
};


export type RootQueryTokenArgs = {
  id: Scalars['String']['input'];
};


export type RootQueryTokensArgs = {
  ids: Array<InputMaybe<Scalars['String']['input']>>;
};


export type RootQueryUserArgs = {
  id: Scalars['String']['input'];
};


export type RootQueryWalletInvitationArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
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

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Get all user projects of user */
  projects?: Maybe<Array<Maybe<Project>>>;
};

export type WalletInvitation = {
  __typename?: 'WalletInvitation';
  code?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectID']['output']>;
  timestamp?: Maybe<Scalars['MongoDateTime']['output']>;
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
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  Project: ResolverTypeWrapper<Project>;
  RootMutation: ResolverTypeWrapper<{}>;
  RootQuery: ResolverTypeWrapper<{}>;
  SendEmergencyKitResult: ResolverTypeWrapper<SendEmergencyKitResult>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SystemInfo: ResolverTypeWrapper<SystemInfo>;
  TokenInfo: ResolverTypeWrapper<TokenInfo>;
  User: ResolverTypeWrapper<User>;
  WalletInvitation: ResolverTypeWrapper<WalletInvitation>;
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
  ObjectID: Scalars['ObjectID']['output'];
  Project: Project;
  RootMutation: {};
  RootQuery: {};
  SendEmergencyKitResult: SendEmergencyKitResult;
  String: Scalars['String']['output'];
  SystemInfo: SystemInfo;
  TokenInfo: TokenInfo;
  User: User;
  WalletInvitation: WalletInvitation;
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

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  banner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  detailIcon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  networks?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  nfts?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  tokens?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RootMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootMutation'] = ResolversParentTypes['RootMutation']> = {
  addProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<RootMutationAddProjectArgs, 'banner' | 'description' | 'detailIcon' | 'logo' | 'name' | 'networks' | 'nfts' | 'tokens' | 'userId'>>;
  addUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<RootMutationAddUserArgs, 'address' | 'name'>>;
  claimWalletInvitation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<RootMutationClaimWalletInvitationArgs, 'code' | 'email'>>;
  joinWaitlist?: Resolver<Maybe<ResolversTypes['JoinWaitlistResult']>, ParentType, ContextType, RequireFields<RootMutationJoinWaitlistArgs, 'description' | 'email' | 'twitter'>>;
  registerAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<RootMutationRegisterAccountArgs, 'key'>>;
  sendEmergencyKit?: Resolver<Maybe<ResolversTypes['SendEmergencyKitResult']>, ParentType, ContextType, RequireFields<RootMutationSendEmergencyKitArgs, 'key'>>;
};

export type RootQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootQuery'] = ResolversParentTypes['RootQuery']> = {
  counter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  greeting?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<RootQueryProjectArgs, 'id'>>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  systemInfo?: Resolver<Maybe<ResolversTypes['SystemInfo']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['TokenInfo']>, ParentType, ContextType, RequireFields<RootQueryTokenArgs, 'id'>>;
  tokens?: Resolver<Maybe<Array<Maybe<ResolversTypes['TokenInfo']>>>, ParentType, ContextType, RequireFields<RootQueryTokensArgs, 'ids'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<RootQueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  walletInvitation?: Resolver<Maybe<ResolversTypes['WalletInvitation']>, ParentType, ContextType, Partial<RootQueryWalletInvitationArgs>>;
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

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletInvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletInvitation'] = ResolversParentTypes['WalletInvitation']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['MongoDateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JoinWaitlistResult?: JoinWaitlistResultResolvers<ContextType>;
  MongoDateTime?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  Project?: ProjectResolvers<ContextType>;
  RootMutation?: RootMutationResolvers<ContextType>;
  RootQuery?: RootQueryResolvers<ContextType>;
  SendEmergencyKitResult?: SendEmergencyKitResultResolvers<ContextType>;
  SystemInfo?: SystemInfoResolvers<ContextType>;
  TokenInfo?: TokenInfoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WalletInvitation?: WalletInvitationResolvers<ContextType>;
};

