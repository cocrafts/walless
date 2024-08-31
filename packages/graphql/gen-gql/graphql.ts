/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar type represents a DateTime. The DateTime is serialized as an RFC 3339 quoted string */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf) */
  JSON: { input: any; output: any; }
  /** MongoDB DateTime */
  MongoDateTime: { input: any; output: any; }
  /** MongoDB ObjectID */
  ObjectID: { input: any; output: any; }
  /** The `Uint32` scalar type represents a 32-bit unsigned integer. */
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

export type History = {
  __typename?: 'History';
  edges: Array<TaskRecordEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type JoinWaitlistResult = {
  __typename?: 'JoinWaitlistResult';
  count?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
};

export type LoyaltyProfile = {
  __typename?: 'LoyaltyProfile';
  history?: Maybe<History>;
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  recurringStatusList?: Maybe<Array<RecurringStatus>>;
  totalPoints: Scalars['Float']['output'];
};


export type LoyaltyProfileHistoryArgs = {
  after: Scalars['String']['input'];
  first: Scalars['Int']['input'];
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
};

export type Partner = {
  __typename?: 'Partner';
  coverImage: Scalars['String']['output'];
  desc: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  socialList: Array<PartnerSocial>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
};

export type PartnerInput = {
  coverImage: Scalars['String']['input'];
  desc: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  logo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  socialList: Array<PartnerSocialInput>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PartnerSocial = {
  __typename?: 'PartnerSocial';
  link: Scalars['String']['output'];
  platform: SocialPlatform;
};

export type PartnerSocialInput = {
  link: Scalars['String']['input'];
  platform: SocialPlatform;
};

export type RecurringStatus = {
  __typename?: 'RecurringStatus';
  currentStreak: Scalars['Int']['output'];
  interval: Scalars['Float']['output'];
  recentTrackAt: Scalars['DateTime']['output'];
  taskId: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

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
  createLoyaltyPartner: Partner;
  createLoyaltyTask: Task;
  deleteLoyaltyPartner: Scalars['Boolean']['output'];
  deleteLoyaltyTask: Scalars['Boolean']['output'];
  deleteWidget?: Maybe<Scalars['Boolean']['output']>;
  deleteWidgetAccount?: Maybe<Scalars['Boolean']['output']>;
  doLoyaltyTask?: Maybe<TaskRecord>;
  doLoyaltyTasksByRecurringGroup?: Maybe<TaskRecord>;
  joinWaitlist?: Maybe<JoinWaitlistResult>;
  registerAccount?: Maybe<Account>;
  registerDevice?: Maybe<Device>;
  registerWidgetAccount?: Maybe<Account>;
  sendEmergencyKit?: Maybe<SendEmergencyKitResult>;
  trackAccountWallets?: Maybe<Scalars['Int']['output']>;
  updateLoyaltyPartner: Partner;
  updateLoyaltyTask: Task;
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


export type RootMutationCreateLoyaltyPartnerArgs = {
  input: PartnerInput;
};


export type RootMutationCreateLoyaltyTaskArgs = {
  input: TaskInput;
};


export type RootMutationDeleteLoyaltyPartnerArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDeleteLoyaltyTaskArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDeleteWidgetArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDeleteWidgetAccountArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDoLoyaltyTaskArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDoLoyaltyTasksByRecurringGroupArgs = {
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


export type RootMutationUpdateLoyaltyPartnerArgs = {
  id: Scalars['String']['input'];
  input: PartnerInput;
};


export type RootMutationUpdateLoyaltyTaskArgs = {
  id: Scalars['String']['input'];
  input: TaskInput;
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
  loyaltyActiveTasks?: Maybe<Array<Task>>;
  loyaltyPartners: Array<Partner>;
  loyaltyProfile: LoyaltyProfile;
  loyaltyTask?: Maybe<Task>;
  loyaltyTaskRecords?: Maybe<Array<TaskRecord>>;
  loyaltyTasks?: Maybe<Array<Task>>;
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


export type RootQueryLoyaltyTaskArgs = {
  id: Scalars['String']['input'];
};


export type RootQueryLoyaltyTaskRecordsArgs = {
  taskId: Scalars['String']['input'];
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

export enum SocialPlatform {
  Discord = 'discord',
  Telegram = 'telegram',
  Web = 'web',
  X = 'x'
}

export type SystemInfo = {
  __typename?: 'SystemInfo';
  environment?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type Task = {
  __typename?: 'Task';
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  interval?: Maybe<Scalars['Float']['output']>;
  mechanism: VerifyMechanism;
  metadata?: Maybe<Scalars['JSON']['output']>;
  milestone?: Maybe<Scalars['Int']['output']>;
  points: Scalars['Float']['output'];
  recurringId?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  streak?: Maybe<Scalars['Int']['output']>;
  type: TaskType;
  verifierKeys?: Maybe<Array<Scalars['String']['output']>>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type TaskInput = {
  /** End date of the task */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** Interval for recurring tasks */
  interval?: InputMaybe<Scalars['Float']['input']>;
  /** Verify Mechanisms: No, Manual, Auto */
  mechanism?: InputMaybe<VerifyMechanism>;
  /** Metadata associated with the task */
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  /** Milestone for milestone tasks */
  milestone?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  /** ID of the recurring task (required for Streak & Milestone task) */
  recurringId?: InputMaybe<Scalars['String']['input']>;
  /** Start date of the task */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** Streak for streak tasks */
  streak?: InputMaybe<Scalars['Int']['input']>;
  /** Types: One Time, Recurring, Streak, Milestone */
  type?: InputMaybe<TaskType>;
  /** Key list of auto verifiers */
  verifierKeys?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type TaskRecord = {
  __typename?: 'TaskRecord';
  id: Scalars['String']['output'];
  profileId: Scalars['String']['output'];
  taskId: Scalars['String']['output'];
  taskVersion: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type TaskRecordEdge = {
  __typename?: 'TaskRecordEdge';
  cursor: Scalars['String']['output'];
  node: TaskRecord;
};

export enum TaskType {
  Milestone = 'milestone',
  Onetime = 'onetime',
  Recurring = 'recurring',
  Streak = 'streak'
}

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

export enum VerifyMechanism {
  Auto = 'auto',
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

export type DoLoyaltyTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DoLoyaltyTaskMutation = { __typename?: 'RootMutation', doLoyaltyTask?: { __typename?: 'TaskRecord', id: string, profileId: string, taskId: string, taskVersion: number, timestamp: any } | null };

export type DoLoyaltyTasksByRecurringGroupMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DoLoyaltyTasksByRecurringGroupMutation = { __typename?: 'RootMutation', doLoyaltyTasksByRecurringGroup?: { __typename?: 'TaskRecord', id: string, profileId: string, taskId: string, taskVersion: number, timestamp: any } | null };

export type UserAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type UserAccountQuery = { __typename?: 'RootQuery', userAccount?: { __typename?: 'Account', id?: any | null, email?: string | null, identifier: string, walletCount?: number | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type UserReferralCodesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserReferralCodesQuery = { __typename?: 'RootQuery', userAccount?: { __typename?: 'Account', referralRank?: number | null, referralCodes?: Array<{ __typename?: 'WalletInvitation', code?: string | null, email?: string | null } | null> | null } | null };

export type LoyaltyTaskQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LoyaltyTaskQuery = { __typename?: 'RootQuery', loyaltyTask?: { __typename?: 'Task', endDate?: any | null, id: string, interval?: number | null, mechanism: VerifyMechanism, metadata?: any | null, milestone?: number | null, points: number, recurringId?: string | null, startDate?: any | null, streak?: number | null, type: TaskType, verifierKeys?: Array<string> | null, version?: number | null } | null };

export type LoyaltyActiveTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type LoyaltyActiveTasksQuery = { __typename?: 'RootQuery', loyaltyActiveTasks?: Array<{ __typename?: 'Task', endDate?: any | null, id: string, interval?: number | null, mechanism: VerifyMechanism, metadata?: any | null, milestone?: number | null, points: number, recurringId?: string | null, startDate?: any | null, streak?: number | null, type: TaskType, verifierKeys?: Array<string> | null, version?: number | null }> | null };

export type LoyaltyTaskRecordsQueryVariables = Exact<{
  taskId: Scalars['String']['input'];
}>;


export type LoyaltyTaskRecordsQuery = { __typename?: 'RootQuery', loyaltyTaskRecords?: Array<{ __typename?: 'TaskRecord', id: string, profileId: string, taskId: string, taskVersion: number, timestamp: any }> | null };

export type LoyaltyProfileQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after: Scalars['String']['input'];
}>;


export type LoyaltyProfileQuery = { __typename?: 'RootQuery', loyaltyProfile: { __typename?: 'LoyaltyProfile', id: string, identifier: string, totalPoints: number, history?: { __typename?: 'History', totalCount: number, edges: Array<{ __typename?: 'TaskRecordEdge', cursor: string, node: { __typename?: 'TaskRecord', id: string, profileId: string, taskId: string, taskVersion: number, timestamp: any } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } | null, recurringStatusList?: Array<{ __typename?: 'RecurringStatus', currentStreak: number, recentTrackAt: any, interval: number, taskId: string, total: number }> | null } };

export type LoyaltyPartnersQueryVariables = Exact<{ [key: string]: never; }>;


export type LoyaltyPartnersQuery = { __typename?: 'RootQuery', loyaltyPartners: Array<{ __typename?: 'Partner', coverImage: string, desc: string, endDate?: any | null, id: string, logo: string, name: string, startDate?: any | null, socialList: Array<{ __typename?: 'PartnerSocial', link: string, platform: SocialPlatform }> }> };


export const DoLoyaltyTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DoLoyaltyTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doLoyaltyTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"taskVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<DoLoyaltyTaskMutation, DoLoyaltyTaskMutationVariables>;
export const DoLoyaltyTasksByRecurringGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DoLoyaltyTasksByRecurringGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doLoyaltyTasksByRecurringGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"taskVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<DoLoyaltyTasksByRecurringGroupMutation, DoLoyaltyTasksByRecurringGroupMutationVariables>;
export const UserAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"walletCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UserAccountQuery, UserAccountQueryVariables>;
export const UserReferralCodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserReferralCodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"referralCodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"referralRank"}}]}}]}}]} as unknown as DocumentNode<UserReferralCodesQuery, UserReferralCodesQueryVariables>;
export const LoyaltyTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoyaltyTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loyaltyTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"mechanism"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"milestone"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"recurringId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"streak"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"verifierKeys"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<LoyaltyTaskQuery, LoyaltyTaskQueryVariables>;
export const LoyaltyActiveTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoyaltyActiveTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loyaltyActiveTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"mechanism"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"milestone"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"recurringId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"streak"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"verifierKeys"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<LoyaltyActiveTasksQuery, LoyaltyActiveTasksQueryVariables>;
export const LoyaltyTaskRecordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoyaltyTaskRecords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loyaltyTaskRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"taskVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<LoyaltyTaskRecordsQuery, LoyaltyTaskRecordsQueryVariables>;
export const LoyaltyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoyaltyProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loyaltyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"totalPoints"}},{"kind":"Field","name":{"kind":"Name","value":"history"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"taskVersion"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recurringStatusList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentStreak"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrackAt"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<LoyaltyProfileQuery, LoyaltyProfileQueryVariables>;
export const LoyaltyPartnersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoyaltyPartners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loyaltyPartners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coverImage"}},{"kind":"Field","name":{"kind":"Name","value":"desc"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"socialList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}}]}}]}}]} as unknown as DocumentNode<LoyaltyPartnersQuery, LoyaltyPartnersQueryVariables>;