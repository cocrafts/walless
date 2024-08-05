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

export type JoinWaitlistResult = {
  __typename?: 'JoinWaitlistResult';
  count?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
};

export type LoyaltyProfile = {
  __typename?: 'LoyaltyProfile';
  id?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  recurringStatusList?: Maybe<Array<Maybe<RecurringStatus>>>;
  totalPoints?: Maybe<Scalars['Float']['output']>;
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

export type RecurringStatus = {
  __typename?: 'RecurringStatus';
  currentStreak?: Maybe<Scalars['Int']['output']>;
  recentTrackAt?: Maybe<Scalars['DateTime']['output']>;
  taskId?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
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
  createLoyaltyTask: Task;
  deleteLoyaltyTask: Scalars['Boolean']['output'];
  deleteWidget?: Maybe<Scalars['Boolean']['output']>;
  deleteWidgetAccount?: Maybe<Scalars['Boolean']['output']>;
  doLoyaltyTask?: Maybe<TaskRecord>;
  joinWaitlist?: Maybe<JoinWaitlistResult>;
  registerAccount?: Maybe<Account>;
  registerDevice?: Maybe<Device>;
  registerWidgetAccount?: Maybe<Account>;
  sendEmergencyKit?: Maybe<SendEmergencyKitResult>;
  trackAccountWallets?: Maybe<Scalars['Int']['output']>;
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


export type RootMutationCreateLoyaltyTaskArgs = {
  input: TaskInput;
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
  taskId: Scalars['String']['input'];
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
  loyaltyProfile: LoyaltyProfile;
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

export type SystemInfo = {
  __typename?: 'SystemInfo';
  environment?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type Task = {
  __typename?: 'Task';
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  interval?: Maybe<Scalars['Float']['output']>;
  mechanism?: Maybe<VerifyMechanism>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  milestone?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  recurringId?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  streak?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<TaskType>;
  verifierKeys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
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
  verifierKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TaskRecord = {
  __typename?: 'TaskRecord';
  id?: Maybe<Scalars['String']['output']>;
  profileId?: Maybe<Scalars['String']['output']>;
  taskId?: Maybe<Scalars['String']['output']>;
  taskVersion?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
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

export type LoyaltyActiveTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type LoyaltyActiveTasksQuery = { __typename?: 'RootQuery', loyaltyActiveTasks?: Array<{ __typename?: 'Task', endDate?: any | null, id?: string | null, interval?: number | null, mechanism?: VerifyMechanism | null, metadata?: any | null, milestone?: number | null, points?: number | null, recurringId?: string | null, startDate?: any | null, streak?: number | null, type?: TaskType | null, verifierKeys?: Array<string | null> | null, version?: number | null }> | null };

export type LoyaltyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type LoyaltyProfileQuery = { __typename?: 'RootQuery', loyaltyProfile: { __typename?: 'LoyaltyProfile', id?: string | null, identifier?: string | null, totalPoints?: number | null, recurringStatusList?: Array<{ __typename?: 'RecurringStatus', currentStreak?: number | null, recentTrackAt?: any | null, taskId?: string | null, total?: number | null } | null> | null } };


export const LoyaltyActiveTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoyaltyActiveTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loyaltyActiveTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"mechanism"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"milestone"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"recurringId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"streak"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"verifierKeys"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<LoyaltyActiveTasksQuery, LoyaltyActiveTasksQueryVariables>;
export const LoyaltyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoyaltyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loyaltyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"totalPoints"}},{"kind":"Field","name":{"kind":"Name","value":"recurringStatusList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentStreak"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrackAt"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<LoyaltyProfileQuery, LoyaltyProfileQueryVariables>;