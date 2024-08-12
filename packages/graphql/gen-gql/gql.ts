/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tmutation DoLoyaltyTask($id: String!) {\n\t\tdoLoyaltyTask(id: $id) {\n\t\t\tid\n\t\t\tprofileId\n\t\t\ttaskId\n\t\t\ttaskVersion\n\t\t\ttimestamp\n\t\t}\n\t}\n": types.DoLoyaltyTaskDocument,
    "\n\tmutation DoLoyaltyTasksByRecurringGroup($id: String!) {\n\t\tdoLoyaltyTasksByRecurringGroup(id: $id) {\n\t\t\tid\n\t\t\tprofileId\n\t\t\ttaskId\n\t\t\ttaskVersion\n\t\t\ttimestamp\n\t\t}\n\t}\n": types.DoLoyaltyTasksByRecurringGroupDocument,
    "\n\tquery UserAccount {\n\t\tuserAccount {\n\t\t\tid\n\t\t\temail\n\t\t\tidentifier\n\t\t\twalletCount\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n": types.UserAccountDocument,
    "\n\tquery UserReferralCodes {\n\t\tuserAccount {\n\t\t\treferralCodes {\n\t\t\t\tcode\n\t\t\t\temail\n\t\t\t}\n\t\t\treferralRank\n\t\t}\n\t}\n": types.UserReferralCodesDocument,
    "\n\tquery LoyaltyTask($id: String!) {\n\t\tloyaltyTask(id: $id) {\n\t\t\tendDate\n\t\t\tid\n\t\t\tinterval\n\t\t\tmechanism\n\t\t\tmetadata\n\t\t\tmilestone\n\t\t\tpoints\n\t\t\trecurringId\n\t\t\tstartDate\n\t\t\tstreak\n\t\t\ttype\n\t\t\tverifierKeys\n\t\t\tversion\n\t\t}\n\t}\n": types.LoyaltyTaskDocument,
    "\n\tquery LoyaltyActiveTasks {\n\t\tloyaltyActiveTasks {\n\t\t\tendDate\n\t\t\tid\n\t\t\tinterval\n\t\t\tmechanism\n\t\t\tmetadata\n\t\t\tmilestone\n\t\t\tpoints\n\t\t\trecurringId\n\t\t\tstartDate\n\t\t\tstreak\n\t\t\ttype\n\t\t\tverifierKeys\n\t\t\tversion\n\t\t}\n\t}\n": types.LoyaltyActiveTasksDocument,
    "\n\tquery LoyaltyTaskRecords($taskId: String!) {\n\t\tloyaltyTaskRecords(taskId: $taskId) {\n\t\t\tid\n\t\t\tprofileId\n\t\t\ttaskId\n\t\t\ttaskVersion\n\t\t\ttimestamp\n\t\t}\n\t}\n": types.LoyaltyTaskRecordsDocument,
    "\n\tquery LoyaltyProfile($first: Int!, $after: String!) {\n\t\tloyaltyProfile {\n\t\t\tid\n\t\t\tidentifier\n\t\t\ttotalPoints\n\t\t\thistory(first: $first, after: $after) {\n\t\t\t\ttotalCount\n\t\t\t\tedges {\n\t\t\t\t\tcursor\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tprofileId\n\t\t\t\t\t\ttaskId\n\t\t\t\t\t\ttaskVersion\n\t\t\t\t\t\ttimestamp\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpageInfo {\n\t\t\t\t\tendCursor\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t}\n\t\t\trecurringStatusList {\n\t\t\t\tcurrentStreak\n\t\t\t\trecentTrackAt\n\t\t\t\tinterval\n\t\t\t\ttaskId\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": types.LoyaltyProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DoLoyaltyTask($id: String!) {\n\t\tdoLoyaltyTask(id: $id) {\n\t\t\tid\n\t\t\tprofileId\n\t\t\ttaskId\n\t\t\ttaskVersion\n\t\t\ttimestamp\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DoLoyaltyTask($id: String!) {\n\t\tdoLoyaltyTask(id: $id) {\n\t\t\tid\n\t\t\tprofileId\n\t\t\ttaskId\n\t\t\ttaskVersion\n\t\t\ttimestamp\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DoLoyaltyTasksByRecurringGroup($id: String!) {\n\t\tdoLoyaltyTasksByRecurringGroup(id: $id) {\n\t\t\tid\n\t\t\tprofileId\n\t\t\ttaskId\n\t\t\ttaskVersion\n\t\t\ttimestamp\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DoLoyaltyTasksByRecurringGroup($id: String!) {\n\t\tdoLoyaltyTasksByRecurringGroup(id: $id) {\n\t\t\tid\n\t\t\tprofileId\n\t\t\ttaskId\n\t\t\ttaskVersion\n\t\t\ttimestamp\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery UserAccount {\n\t\tuserAccount {\n\t\t\tid\n\t\t\temail\n\t\t\tidentifier\n\t\t\twalletCount\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery UserAccount {\n\t\tuserAccount {\n\t\t\tid\n\t\t\temail\n\t\t\tidentifier\n\t\t\twalletCount\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery UserReferralCodes {\n\t\tuserAccount {\n\t\t\treferralCodes {\n\t\t\t\tcode\n\t\t\t\temail\n\t\t\t}\n\t\t\treferralRank\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery UserReferralCodes {\n\t\tuserAccount {\n\t\t\treferralCodes {\n\t\t\t\tcode\n\t\t\t\temail\n\t\t\t}\n\t\t\treferralRank\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery LoyaltyTask($id: String!) {\n\t\tloyaltyTask(id: $id) {\n\t\t\tendDate\n\t\t\tid\n\t\t\tinterval\n\t\t\tmechanism\n\t\t\tmetadata\n\t\t\tmilestone\n\t\t\tpoints\n\t\t\trecurringId\n\t\t\tstartDate\n\t\t\tstreak\n\t\t\ttype\n\t\t\tverifierKeys\n\t\t\tversion\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery LoyaltyTask($id: String!) {\n\t\tloyaltyTask(id: $id) {\n\t\t\tendDate\n\t\t\tid\n\t\t\tinterval\n\t\t\tmechanism\n\t\t\tmetadata\n\t\t\tmilestone\n\t\t\tpoints\n\t\t\trecurringId\n\t\t\tstartDate\n\t\t\tstreak\n\t\t\ttype\n\t\t\tverifierKeys\n\t\t\tversion\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery LoyaltyActiveTasks {\n\t\tloyaltyActiveTasks {\n\t\t\tendDate\n\t\t\tid\n\t\t\tinterval\n\t\t\tmechanism\n\t\t\tmetadata\n\t\t\tmilestone\n\t\t\tpoints\n\t\t\trecurringId\n\t\t\tstartDate\n\t\t\tstreak\n\t\t\ttype\n\t\t\tverifierKeys\n\t\t\tversion\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery LoyaltyActiveTasks {\n\t\tloyaltyActiveTasks {\n\t\t\tendDate\n\t\t\tid\n\t\t\tinterval\n\t\t\tmechanism\n\t\t\tmetadata\n\t\t\tmilestone\n\t\t\tpoints\n\t\t\trecurringId\n\t\t\tstartDate\n\t\t\tstreak\n\t\t\ttype\n\t\t\tverifierKeys\n\t\t\tversion\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery LoyaltyTaskRecords($taskId: String!) {\n\t\tloyaltyTaskRecords(taskId: $taskId) {\n\t\t\tid\n\t\t\tprofileId\n\t\t\ttaskId\n\t\t\ttaskVersion\n\t\t\ttimestamp\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery LoyaltyTaskRecords($taskId: String!) {\n\t\tloyaltyTaskRecords(taskId: $taskId) {\n\t\t\tid\n\t\t\tprofileId\n\t\t\ttaskId\n\t\t\ttaskVersion\n\t\t\ttimestamp\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery LoyaltyProfile($first: Int!, $after: String!) {\n\t\tloyaltyProfile {\n\t\t\tid\n\t\t\tidentifier\n\t\t\ttotalPoints\n\t\t\thistory(first: $first, after: $after) {\n\t\t\t\ttotalCount\n\t\t\t\tedges {\n\t\t\t\t\tcursor\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tprofileId\n\t\t\t\t\t\ttaskId\n\t\t\t\t\t\ttaskVersion\n\t\t\t\t\t\ttimestamp\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpageInfo {\n\t\t\t\t\tendCursor\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t}\n\t\t\trecurringStatusList {\n\t\t\t\tcurrentStreak\n\t\t\t\trecentTrackAt\n\t\t\t\tinterval\n\t\t\t\ttaskId\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery LoyaltyProfile($first: Int!, $after: String!) {\n\t\tloyaltyProfile {\n\t\t\tid\n\t\t\tidentifier\n\t\t\ttotalPoints\n\t\t\thistory(first: $first, after: $after) {\n\t\t\t\ttotalCount\n\t\t\t\tedges {\n\t\t\t\t\tcursor\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tprofileId\n\t\t\t\t\t\ttaskId\n\t\t\t\t\t\ttaskVersion\n\t\t\t\t\t\ttimestamp\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpageInfo {\n\t\t\t\t\tendCursor\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t}\n\t\t\trecurringStatusList {\n\t\t\t\tcurrentStreak\n\t\t\t\trecentTrackAt\n\t\t\t\tinterval\n\t\t\t\ttaskId\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;