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
  ID: { input: string; output: string; }
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
  referralCodes?: Maybe<Array<Maybe<WalletInvitation>>>;
  referralRank?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['MongoDateTime']['output']>;
  walletCount?: Maybe<Scalars['Int']['output']>;
};

export type Action = {
  __typename?: 'Action';
  category?: Maybe<ActionCategory>;
  cycleInHours?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mechanism?: Maybe<VerifyMechanism>;
  metadata?: Maybe<Array<Maybe<ActionMetadata>>>;
  milestone?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  streak?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  validFrom?: Maybe<Scalars['DateTime']['output']>;
  validUntil?: Maybe<Scalars['DateTime']['output']>;
  verifier?: Maybe<Scalars['String']['output']>;
};

export enum ActionCategory {
  Milestone = 'milestone',
  Onetime = 'onetime',
  Recurring = 'recurring',
  Streak = 'streak'
}

export type ActionCount = {
  __typename?: 'ActionCount';
  cycleInHours?: Maybe<Scalars['Float']['output']>;
  lastClaim?: Maybe<Scalars['DateTime']['output']>;
  milestone?: Maybe<Scalars['Int']['output']>;
  streaks?: Maybe<Array<Maybe<Streak>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ActionMetadata = {
  __typename?: 'ActionMetadata';
  key?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ActionMetadataInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ActionRecord = {
  __typename?: 'ActionRecord';
  actionId?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Boost = {
  __typename?: 'Boost';
  actionId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  multiplier?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  validFrom?: Maybe<Scalars['DateTime']['output']>;
  validUntil?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateActionInput = {
  category: ActionCategory;
  cycleInHours?: InputMaybe<Scalars['Float']['input']>;
  metadata?: InputMaybe<Array<InputMaybe<ActionMetadataInput>>>;
  milestone?: InputMaybe<Scalars['Int']['input']>;
  points: Scalars['Float']['input'];
  streak?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
  validFrom?: InputMaybe<Scalars['DateTime']['input']>;
  validUntil?: InputMaybe<Scalars['DateTime']['input']>;
  verifier?: InputMaybe<Scalars['String']['input']>;
  verifyMechanism: VerifyMechanism;
};

export type Device = {
  __typename?: 'Device';
  appVersion?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<Scalars['String']['output']>;
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deviceId?: Maybe<Scalars['String']['output']>;
  deviceName?: Maybe<Scalars['String']['output']>;
  deviceType?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectID']['output']>;
  lastUpdateTime?: Maybe<Scalars['String']['output']>;
  manufacturer?: Maybe<Scalars['String']['output']>;
  notificationToken?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  systemVersion?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  userIdentifier?: Maybe<Scalars['String']['output']>;
};

export type DeviceInfoInput = {
  appVersion?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  carrier?: InputMaybe<Scalars['String']['input']>;
  deviceId: Scalars['String']['input'];
  deviceName?: InputMaybe<Scalars['String']['input']>;
  deviceType?: InputMaybe<Scalars['String']['input']>;
  lastUpdateTime?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  notificationToken?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  systemVersion?: InputMaybe<Scalars['String']['input']>;
};

export type HistoryItem = {
  __typename?: 'HistoryItem';
  action?: Maybe<Action>;
  boosts?: Maybe<Array<Maybe<Boost>>>;
  doneAt?: Maybe<Scalars['DateTime']['output']>;
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
  type: NonceType;
  value: Scalars['Uint32']['output'];
};

export enum NonceType {
  Login = 'Login'
}

export type ReferralRank = {
  __typename?: 'ReferralRank';
  accountId?: Maybe<Scalars['ObjectID']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectID']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  rankChange?: Maybe<Scalars['Int']['output']>;
  referralCount?: Maybe<Scalars['Int']['output']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  addWidget?: Maybe<Widget>;
  claimWalletInvitation?: Maybe<Scalars['Boolean']['output']>;
  createLoyaltyAction?: Maybe<Action>;
  createLoyaltyBoost?: Maybe<Boost>;
  deleteWidget?: Maybe<Scalars['Boolean']['output']>;
  deleteWidgetAccount?: Maybe<Scalars['Boolean']['output']>;
  doLoyaltyAction?: Maybe<ActionRecord>;
  doRecurringThenStreakThenMilestoneActionsByType?: Maybe<Array<Maybe<ActionRecord>>>;
  joinWaitlist?: Maybe<JoinWaitlistResult>;
  registerAccount?: Maybe<Account>;
  registerDevice?: Maybe<Device>;
  registerWidgetAccount?: Maybe<Account>;
  sendEmergencyKit?: Maybe<SendEmergencyKitResult>;
  trackAccountWallets?: Maybe<Scalars['Int']['output']>;
  updateWidgetAccountRole?: Maybe<WidgetAccount>;
  updateWidgetOwner?: Maybe<Widget>;
  updateWidgetStatus?: Maybe<Widget>;
  verifyWidgetAccount?: Maybe<WidgetAccount>;
};


export type RootMutationAddWidgetArgs = {
  banner?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  largeLogo?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  networks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nfts?: InputMaybe<Array<InputMaybe<WidgetTokenInput>>>;
  ownerId: Scalars['String']['input'];
  tokens?: InputMaybe<Array<InputMaybe<WidgetTokenInput>>>;
};


export type RootMutationClaimWalletInvitationArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type RootMutationCreateLoyaltyActionArgs = {
  input: CreateActionInput;
};


export type RootMutationCreateLoyaltyBoostArgs = {
  actionId: Scalars['String']['input'];
  multiplier: Scalars['Float']['input'];
  points: Scalars['Float']['input'];
  validFrom: Scalars['DateTime']['input'];
  validUntil: Scalars['DateTime']['input'];
};


export type RootMutationDeleteWidgetArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDeleteWidgetAccountArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDoLoyaltyActionArgs = {
  actionId: Scalars['String']['input'];
};


export type RootMutationDoRecurringThenStreakThenMilestoneActionsByTypeArgs = {
  type: Scalars['String']['input'];
};


export type RootMutationJoinWaitlistArgs = {
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  twitter: Scalars['String']['input'];
};


export type RootMutationRegisterAccountArgs = {
  key: Scalars['String']['input'];
};


export type RootMutationRegisterDeviceArgs = {
  device: DeviceInfoInput;
};


export type RootMutationRegisterWidgetAccountArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  pubkey: Scalars['String']['input'];
};


export type RootMutationSendEmergencyKitArgs = {
  key: Scalars['String']['input'];
};


export type RootMutationTrackAccountWalletsArgs = {
  wallets: Array<InputMaybe<TrackAccountWalletInput>>;
};


export type RootMutationUpdateWidgetAccountRoleArgs = {
  id: Scalars['String']['input'];
  role: WidgetAccountRole;
};


export type RootMutationUpdateWidgetOwnerArgs = {
  id: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
};


export type RootMutationUpdateWidgetStatusArgs = {
  id: Scalars['String']['input'];
  status: WidgetStatus;
  updaterPubkey: Scalars['String']['input'];
};


export type RootMutationVerifyWidgetAccountArgs = {
  pubkey: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  counter?: Maybe<Scalars['Int']['output']>;
  greeting?: Maybe<Scalars['String']['output']>;
  loginMessage?: Maybe<Scalars['String']['output']>;
  loyaltyActions?: Maybe<Array<Maybe<Action>>>;
  loyaltyActiveActions?: Maybe<Array<Maybe<Action>>>;
  loyaltyBoosts?: Maybe<Array<Maybe<Boost>>>;
  loyaltyCurrentBoostsOfAction?: Maybe<Array<Maybe<Boost>>>;
  loyaltyHistory?: Maybe<Array<Maybe<HistoryItem>>>;
  loyaltyUserProgress?: Maybe<UserProgress>;
  nonce?: Maybe<Nonce>;
  referralLeaderboard?: Maybe<Array<Maybe<ReferralRank>>>;
  referralLeaderboardSize?: Maybe<Scalars['Int']['output']>;
  systemInfo?: Maybe<SystemInfo>;
  token?: Maybe<TokenInfo>;
  tokenByAddress?: Maybe<TokenInfo>;
  tokens?: Maybe<Array<Maybe<TokenInfo>>>;
  tokensByAddress?: Maybe<Array<Maybe<TokenInfo>>>;
  userAccount?: Maybe<Account>;
  walletInvitation?: Maybe<WalletInvitation>;
  widget?: Maybe<Widget>;
  widgetAccounts?: Maybe<Array<Maybe<WidgetAccount>>>;
  widgets?: Maybe<Array<Maybe<Widget>>>;
  widgetsByPubkey?: Maybe<Array<Maybe<Widget>>>;
  widgetsByStatus?: Maybe<Array<Maybe<Widget>>>;
};


export type RootQueryLoginMessageArgs = {
  pubkey: Scalars['String']['input'];
};


export type RootQueryLoyaltyCurrentBoostsOfActionArgs = {
  actionId: Scalars['String']['input'];
};


export type RootQueryNonceArgs = {
  identifier: Scalars['String']['input'];
};


export type RootQueryReferralLeaderboardArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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


export type RootQueryWidgetsByPubkeyArgs = {
  pubkey: Scalars['String']['input'];
};


export type RootQueryWidgetsByStatusArgs = {
  status: WidgetStatus;
};

export type SendEmergencyKitResult = {
  __typename?: 'SendEmergencyKitResult';
  messageId?: Maybe<Scalars['String']['output']>;
};

export type Streak = {
  __typename?: 'Streak';
  currentStreak?: Maybe<Scalars['Int']['output']>;
  remainingClaims?: Maybe<Scalars['Int']['output']>;
  streak?: Maybe<Scalars['Int']['output']>;
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

export type TrackAccountWalletInput = {
  address: Scalars['String']['input'];
  network?: InputMaybe<Scalars['String']['input']>;
};

export type UserProgress = {
  __typename?: 'UserProgress';
  actionRecords?: Maybe<Array<Maybe<ActionRecord>>>;
  id?: Maybe<Scalars['String']['output']>;
  totalPoints?: Maybe<Scalars['Int']['output']>;
  trackList?: Maybe<Array<Maybe<ActionCount>>>;
};

export enum VerifyMechanism {
  Automated = 'automated',
  Manual = 'manual',
  No = 'no'
}

export type WalletInvitation = {
  __typename?: 'WalletInvitation';
  claimedAt?: Maybe<Scalars['MongoDateTime']['output']>;
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
  ownerId?: Maybe<Scalars['ObjectID']['output']>;
  status?: Maybe<WidgetStatus>;
  tokens?: Maybe<Array<Maybe<Token>>>;
};

export type WidgetAccount = {
  __typename?: 'WidgetAccount';
  createdAt?: Maybe<Scalars['MongoDateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectID']['output']>;
  identifier: Scalars['String']['output'];
  role?: Maybe<WidgetAccountRole>;
  updatedAt?: Maybe<Scalars['MongoDateTime']['output']>;
};

export enum WidgetAccountRole {
  Admin = 'ADMIN',
  User = 'USER'
}

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
  Action: ResolverTypeWrapper<Action>;
  ActionCategory: ActionCategory;
  ActionCount: ResolverTypeWrapper<ActionCount>;
  ActionMetadata: ResolverTypeWrapper<ActionMetadata>;
  ActionMetadataInput: ActionMetadataInput;
  ActionRecord: ResolverTypeWrapper<ActionRecord>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Boost: ResolverTypeWrapper<Boost>;
  CreateActionInput: CreateActionInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Device: ResolverTypeWrapper<Device>;
  DeviceInfoInput: DeviceInfoInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  HistoryItem: ResolverTypeWrapper<HistoryItem>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  JoinWaitlistResult: ResolverTypeWrapper<JoinWaitlistResult>;
  MongoDateTime: ResolverTypeWrapper<Scalars['MongoDateTime']['output']>;
  Nonce: ResolverTypeWrapper<Nonce>;
  NonceType: NonceType;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  ReferralRank: ResolverTypeWrapper<ReferralRank>;
  RootMutation: ResolverTypeWrapper<{}>;
  RootQuery: ResolverTypeWrapper<{}>;
  SendEmergencyKitResult: ResolverTypeWrapper<SendEmergencyKitResult>;
  Streak: ResolverTypeWrapper<Streak>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SystemInfo: ResolverTypeWrapper<SystemInfo>;
  Token: ResolverTypeWrapper<Token>;
  TokenInfo: ResolverTypeWrapper<TokenInfo>;
  TrackAccountWalletInput: TrackAccountWalletInput;
  Uint32: ResolverTypeWrapper<Scalars['Uint32']['output']>;
  UserProgress: ResolverTypeWrapper<UserProgress>;
  VerifyMechanism: VerifyMechanism;
  WalletInvitation: ResolverTypeWrapper<WalletInvitation>;
  Widget: ResolverTypeWrapper<Widget>;
  WidgetAccount: ResolverTypeWrapper<WidgetAccount>;
  WidgetAccountRole: WidgetAccountRole;
  WidgetStatus: WidgetStatus;
  WidgetTokenInput: WidgetTokenInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  Action: Action;
  ActionCount: ActionCount;
  ActionMetadata: ActionMetadata;
  ActionMetadataInput: ActionMetadataInput;
  ActionRecord: ActionRecord;
  Boolean: Scalars['Boolean']['output'];
  Boost: Boost;
  CreateActionInput: CreateActionInput;
  DateTime: Scalars['DateTime']['output'];
  Device: Device;
  DeviceInfoInput: DeviceInfoInput;
  Float: Scalars['Float']['output'];
  HistoryItem: HistoryItem;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  JoinWaitlistResult: JoinWaitlistResult;
  MongoDateTime: Scalars['MongoDateTime']['output'];
  Nonce: Nonce;
  ObjectID: Scalars['ObjectID']['output'];
  ReferralRank: ReferralRank;
  RootMutation: {};
  RootQuery: {};
  SendEmergencyKitResult: SendEmergencyKitResult;
  Streak: Streak;
  String: Scalars['String']['output'];
  SystemInfo: SystemInfo;
  Token: Token;
  TokenInfo: TokenInfo;
  TrackAccountWalletInput: TrackAccountWalletInput;
  Uint32: Scalars['Uint32']['output'];
  UserProgress: UserProgress;
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
  referralCodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['WalletInvitation']>>>, ParentType, ContextType>;
  referralRank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['MongoDateTime']>, ParentType, ContextType>;
  walletCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Action'] = ResolversParentTypes['Action']> = {
  category?: Resolver<Maybe<ResolversTypes['ActionCategory']>, ParentType, ContextType>;
  cycleInHours?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mechanism?: Resolver<Maybe<ResolversTypes['VerifyMechanism']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<Array<Maybe<ResolversTypes['ActionMetadata']>>>, ParentType, ContextType>;
  milestone?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  streak?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validFrom?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  validUntil?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  verifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActionCount'] = ResolversParentTypes['ActionCount']> = {
  cycleInHours?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lastClaim?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  milestone?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  streaks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Streak']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActionMetadata'] = ResolversParentTypes['ActionMetadata']> = {
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActionRecord'] = ResolversParentTypes['ActionRecord']> = {
  actionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Boost'] = ResolversParentTypes['Boost']> = {
  actionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  multiplier?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  points?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  validFrom?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  validUntil?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeviceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']> = {
  appVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  carrier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deviceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deviceName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deviceType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  lastUpdateTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notificationToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  platform?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  systemVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userIdentifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HistoryItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['HistoryItem'] = ResolversParentTypes['HistoryItem']> = {
  action?: Resolver<Maybe<ResolversTypes['Action']>, ParentType, ContextType>;
  boosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Boost']>>>, ParentType, ContextType>;
  doneAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  type?: Resolver<ResolversTypes['NonceType'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Uint32'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type ReferralRankResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReferralRank'] = ResolversParentTypes['ReferralRank']> = {
  accountId?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rankChange?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  referralCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RootMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootMutation'] = ResolversParentTypes['RootMutation']> = {
  addWidget?: Resolver<Maybe<ResolversTypes['Widget']>, ParentType, ContextType, RequireFields<RootMutationAddWidgetArgs, 'description' | 'name' | 'networks' | 'ownerId'>>;
  claimWalletInvitation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<RootMutationClaimWalletInvitationArgs, 'code' | 'email'>>;
  createLoyaltyAction?: Resolver<Maybe<ResolversTypes['Action']>, ParentType, ContextType, RequireFields<RootMutationCreateLoyaltyActionArgs, 'input'>>;
  createLoyaltyBoost?: Resolver<Maybe<ResolversTypes['Boost']>, ParentType, ContextType, RequireFields<RootMutationCreateLoyaltyBoostArgs, 'actionId' | 'multiplier' | 'points' | 'validFrom' | 'validUntil'>>;
  deleteWidget?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<RootMutationDeleteWidgetArgs, 'id'>>;
  deleteWidgetAccount?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<RootMutationDeleteWidgetAccountArgs, 'id'>>;
  doLoyaltyAction?: Resolver<Maybe<ResolversTypes['ActionRecord']>, ParentType, ContextType, RequireFields<RootMutationDoLoyaltyActionArgs, 'actionId'>>;
  doRecurringThenStreakThenMilestoneActionsByType?: Resolver<Maybe<Array<Maybe<ResolversTypes['ActionRecord']>>>, ParentType, ContextType, RequireFields<RootMutationDoRecurringThenStreakThenMilestoneActionsByTypeArgs, 'type'>>;
  joinWaitlist?: Resolver<Maybe<ResolversTypes['JoinWaitlistResult']>, ParentType, ContextType, RequireFields<RootMutationJoinWaitlistArgs, 'description' | 'email' | 'twitter'>>;
  registerAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<RootMutationRegisterAccountArgs, 'key'>>;
  registerDevice?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, RequireFields<RootMutationRegisterDeviceArgs, 'device'>>;
  registerWidgetAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<RootMutationRegisterWidgetAccountArgs, 'pubkey'>>;
  sendEmergencyKit?: Resolver<Maybe<ResolversTypes['SendEmergencyKitResult']>, ParentType, ContextType, RequireFields<RootMutationSendEmergencyKitArgs, 'key'>>;
  trackAccountWallets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<RootMutationTrackAccountWalletsArgs, 'wallets'>>;
  updateWidgetAccountRole?: Resolver<Maybe<ResolversTypes['WidgetAccount']>, ParentType, ContextType, RequireFields<RootMutationUpdateWidgetAccountRoleArgs, 'id' | 'role'>>;
  updateWidgetOwner?: Resolver<Maybe<ResolversTypes['Widget']>, ParentType, ContextType, RequireFields<RootMutationUpdateWidgetOwnerArgs, 'id' | 'ownerId'>>;
  updateWidgetStatus?: Resolver<Maybe<ResolversTypes['Widget']>, ParentType, ContextType, RequireFields<RootMutationUpdateWidgetStatusArgs, 'id' | 'status' | 'updaterPubkey'>>;
  verifyWidgetAccount?: Resolver<Maybe<ResolversTypes['WidgetAccount']>, ParentType, ContextType, RequireFields<RootMutationVerifyWidgetAccountArgs, 'pubkey' | 'signature'>>;
};

export type RootQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootQuery'] = ResolversParentTypes['RootQuery']> = {
  counter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  greeting?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loginMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<RootQueryLoginMessageArgs, 'pubkey'>>;
  loyaltyActions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Action']>>>, ParentType, ContextType>;
  loyaltyActiveActions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Action']>>>, ParentType, ContextType>;
  loyaltyBoosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Boost']>>>, ParentType, ContextType>;
  loyaltyCurrentBoostsOfAction?: Resolver<Maybe<Array<Maybe<ResolversTypes['Boost']>>>, ParentType, ContextType, RequireFields<RootQueryLoyaltyCurrentBoostsOfActionArgs, 'actionId'>>;
  loyaltyHistory?: Resolver<Maybe<Array<Maybe<ResolversTypes['HistoryItem']>>>, ParentType, ContextType>;
  loyaltyUserProgress?: Resolver<Maybe<ResolversTypes['UserProgress']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['Nonce']>, ParentType, ContextType, RequireFields<RootQueryNonceArgs, 'identifier'>>;
  referralLeaderboard?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReferralRank']>>>, ParentType, ContextType, Partial<RootQueryReferralLeaderboardArgs>>;
  referralLeaderboardSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  systemInfo?: Resolver<Maybe<ResolversTypes['SystemInfo']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['TokenInfo']>, ParentType, ContextType, RequireFields<RootQueryTokenArgs, 'id'>>;
  tokenByAddress?: Resolver<Maybe<ResolversTypes['TokenInfo']>, ParentType, ContextType, RequireFields<RootQueryTokenByAddressArgs, 'address'>>;
  tokens?: Resolver<Maybe<Array<Maybe<ResolversTypes['TokenInfo']>>>, ParentType, ContextType, RequireFields<RootQueryTokensArgs, 'ids'>>;
  tokensByAddress?: Resolver<Maybe<Array<Maybe<ResolversTypes['TokenInfo']>>>, ParentType, ContextType, RequireFields<RootQueryTokensByAddressArgs, 'addresses'>>;
  userAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  walletInvitation?: Resolver<Maybe<ResolversTypes['WalletInvitation']>, ParentType, ContextType, Partial<RootQueryWalletInvitationArgs>>;
  widget?: Resolver<Maybe<ResolversTypes['Widget']>, ParentType, ContextType, RequireFields<RootQueryWidgetArgs, 'id'>>;
  widgetAccounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['WidgetAccount']>>>, ParentType, ContextType>;
  widgets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Widget']>>>, ParentType, ContextType>;
  widgetsByPubkey?: Resolver<Maybe<Array<Maybe<ResolversTypes['Widget']>>>, ParentType, ContextType, RequireFields<RootQueryWidgetsByPubkeyArgs, 'pubkey'>>;
  widgetsByStatus?: Resolver<Maybe<Array<Maybe<ResolversTypes['Widget']>>>, ParentType, ContextType, RequireFields<RootQueryWidgetsByStatusArgs, 'status'>>;
};

export type SendEmergencyKitResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendEmergencyKitResult'] = ResolversParentTypes['SendEmergencyKitResult']> = {
  messageId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StreakResolvers<ContextType = any, ParentType extends ResolversParentTypes['Streak'] = ResolversParentTypes['Streak']> = {
  currentStreak?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  remainingClaims?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  streak?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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

export type UserProgressResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProgress'] = ResolversParentTypes['UserProgress']> = {
  actionRecords?: Resolver<Maybe<Array<Maybe<ResolversTypes['ActionRecord']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalPoints?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  trackList?: Resolver<Maybe<Array<Maybe<ResolversTypes['ActionCount']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletInvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletInvitation'] = ResolversParentTypes['WalletInvitation']> = {
  claimedAt?: Resolver<Maybe<ResolversTypes['MongoDateTime']>, ParentType, ContextType>;
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
  ownerId?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['WidgetStatus']>, ParentType, ContextType>;
  tokens?: Resolver<Maybe<Array<Maybe<ResolversTypes['Token']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetAccount'] = ResolversParentTypes['WidgetAccount']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['MongoDateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['WidgetAccountRole']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['MongoDateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  Action?: ActionResolvers<ContextType>;
  ActionCount?: ActionCountResolvers<ContextType>;
  ActionMetadata?: ActionMetadataResolvers<ContextType>;
  ActionRecord?: ActionRecordResolvers<ContextType>;
  Boost?: BoostResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Device?: DeviceResolvers<ContextType>;
  HistoryItem?: HistoryItemResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JoinWaitlistResult?: JoinWaitlistResultResolvers<ContextType>;
  MongoDateTime?: GraphQLScalarType;
  Nonce?: NonceResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  ReferralRank?: ReferralRankResolvers<ContextType>;
  RootMutation?: RootMutationResolvers<ContextType>;
  RootQuery?: RootQueryResolvers<ContextType>;
  SendEmergencyKitResult?: SendEmergencyKitResultResolvers<ContextType>;
  Streak?: StreakResolvers<ContextType>;
  SystemInfo?: SystemInfoResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  TokenInfo?: TokenInfoResolvers<ContextType>;
  Uint32?: GraphQLScalarType;
  UserProgress?: UserProgressResolvers<ContextType>;
  WalletInvitation?: WalletInvitationResolvers<ContextType>;
  Widget?: WidgetResolvers<ContextType>;
  WidgetAccount?: WidgetAccountResolvers<ContextType>;
};

