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
  JSONObject: { input: any; output: any; }
};

export type InvitationAccount = {
  __typename?: 'InvitationAccount';
  kind: Scalars['String']['output'];
  pk: Scalars['String']['output'];
  sk: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type InvitationCode = {
  __typename?: 'InvitationCode';
  email?: Maybe<Scalars['String']['output']>;
  kind: Scalars['String']['output'];
  pk: Scalars['String']['output'];
  sk: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  bindInvitation: Scalars['Boolean']['output'];
  crawlTokenMeta: Scalars['Int']['output'];
  createUser: User;
  hydrateTokenMap: Scalars['Int']['output'];
};


export type RootMutationBindInvitationArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type RootMutationCreateUserArgs = {
  name: Scalars['String']['input'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  greeting: Scalars['String']['output'];
  invitationAccount?: Maybe<InvitationAccount>;
  invitationCode?: Maybe<InvitationCode>;
  systemInfo: SystemInfo;
  token?: Maybe<TokenInfo>;
  tokens: Array<TokenInfo>;
  tokensByAddress: Array<TokenInfo>;
};


export type RootQueryInvitationAccountArgs = {
  email: Scalars['String']['input'];
};


export type RootQueryInvitationCodeArgs = {
  code: Scalars['String']['input'];
};


export type RootQueryTokenArgs = {
  id: Scalars['String']['input'];
};


export type RootQueryTokensArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type RootQueryTokensByAddressArgs = {
  addresses: Array<Scalars['String']['input']>;
};

export type SystemInfo = {
  __typename?: 'SystemInfo';
  environment: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type TokenInfo = {
  __typename?: 'TokenInfo';
  address?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  platforms: Scalars['JSONObject']['output'];
  quotes: Scalars['JSONObject']['output'];
  symbol: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InvitationAccount: ResolverTypeWrapper<InvitationAccount>;
  InvitationCode: ResolverTypeWrapper<InvitationCode>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  RootMutation: ResolverTypeWrapper<{}>;
  RootQuery: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SystemInfo: ResolverTypeWrapper<SystemInfo>;
  TokenInfo: ResolverTypeWrapper<TokenInfo>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  InvitationAccount: InvitationAccount;
  InvitationCode: InvitationCode;
  JSONObject: Scalars['JSONObject']['output'];
  RootMutation: {};
  RootQuery: {};
  String: Scalars['String']['output'];
  SystemInfo: SystemInfo;
  TokenInfo: TokenInfo;
  User: User;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type InvitationAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitationAccount'] = ResolversParentTypes['InvitationAccount']> = {
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitationCodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitationCode'] = ResolversParentTypes['InvitationCode']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type RootMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootMutation'] = ResolversParentTypes['RootMutation']> = {
  bindInvitation?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<RootMutationBindInvitationArgs, 'code' | 'email'>>;
  crawlTokenMeta?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<RootMutationCreateUserArgs, 'name'>>;
  hydrateTokenMap?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type RootQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootQuery'] = ResolversParentTypes['RootQuery']> = {
  greeting?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invitationAccount?: Resolver<Maybe<ResolversTypes['InvitationAccount']>, ParentType, ContextType, RequireFields<RootQueryInvitationAccountArgs, 'email'>>;
  invitationCode?: Resolver<Maybe<ResolversTypes['InvitationCode']>, ParentType, ContextType, RequireFields<RootQueryInvitationCodeArgs, 'code'>>;
  systemInfo?: Resolver<ResolversTypes['SystemInfo'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['TokenInfo']>, ParentType, ContextType, RequireFields<RootQueryTokenArgs, 'id'>>;
  tokens?: Resolver<Array<ResolversTypes['TokenInfo']>, ParentType, ContextType, RequireFields<RootQueryTokensArgs, 'ids'>>;
  tokensByAddress?: Resolver<Array<ResolversTypes['TokenInfo']>, ParentType, ContextType, RequireFields<RootQueryTokensByAddressArgs, 'addresses'>>;
};

export type SystemInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SystemInfo'] = ResolversParentTypes['SystemInfo']> = {
  environment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenInfo'] = ResolversParentTypes['TokenInfo']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  platforms?: Resolver<ResolversTypes['JSONObject'], ParentType, ContextType>;
  quotes?: Resolver<ResolversTypes['JSONObject'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  InvitationAccount?: InvitationAccountResolvers<ContextType>;
  InvitationCode?: InvitationCodeResolvers<ContextType>;
  JSONObject?: GraphQLScalarType;
  RootMutation?: RootMutationResolvers<ContextType>;
  RootQuery?: RootQueryResolvers<ContextType>;
  SystemInfo?: SystemInfoResolvers<ContextType>;
  TokenInfo?: TokenInfoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

