import { gql } from 'graphql-request';

export const updateWidgetStatus = gql`
	mutation UpdateWidgetStatus($id: String!, $status: WidgetStatus!) {
		updateWidgetStatus(id: $id, status: $status)
	}
`;
