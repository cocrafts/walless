import { gql } from 'graphql-request';

export const allWidgets = gql`
	query Widgets {
		widgets {
			banner
			description
			id
			largeLogo
			logo
			name
			networks
			nfts {
				address
				id
			}
			status
			tokens {
				address
				id
			}
		}
	}
`;

export const widgetsByStatus = gql`
	query WidgetsByStatus($status: WidgetStatus!) {
		widgetsByStatus(status: $status) {
			banner
			description
			id
			largeLogo
			logo
			name
			networks
			nfts {
				address
				id
			}
			status
			tokens {
				address
				id
			}
		}
	}
`;
