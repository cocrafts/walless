export interface UniversalAnalytics {
	logEvent: UniversalEventLogger;
}

export type UniversalEventLogger = (
	eventName: string,
	eventParams: EventParams,
	options?: AnalyticsCallOptions,
) => void;

export type Currency = string | number;

export interface AnalyticsCallOptions {
	/**
	 * If true, this config or event call applies globally to all
	 * Google Analytics properties on the page.
	 */
	global: boolean;
}

export interface UniversalEventPayload {
	coupon?: EventParams['coupon'];
	currency?: EventParams['currency'];
	items?: EventParams['items'];
	payment_type?: EventParams['payment_type'];
	value?: EventParams['value'];
	[key: string]: any; // eslint-disable-line
}

export interface EventParams {
	checkout_option?: string;
	checkout_step?: number;
	item_id?: string;
	content_type?: string;
	coupon?: string;
	currency?: string;
	description?: string;
	fatal?: boolean;
	items?: Item[];
	method?: string;
	number?: string;
	screen_name?: string;
	/**
	 * Firebase-specific. Use to log a `screen_name` to Firebase Analytics.
	 */
	firebase_screen?: string;
	/**
	 * Firebase-specific. Use to log a `screen_class` to Firebase Analytics.
	 */
	firebase_screen_class?: string;
	search_term?: string;
	shipping?: Currency;
	tax?: Currency;
	transaction_id?: string;
	value?: number;
	event_label?: string;
	event_category?: string;
	shipping_tier?: string;
	item_list_id?: string;
	item_list_name?: string;
	promotion_id?: string;
	promotion_name?: string;
	payment_type?: string;
	affiliation?: string;
	page_title?: string;
	page_location?: string;
	page_path?: string;
	[key: string]: unknown;
}

export interface Item {
	item_id?: string;
	item_name?: string;
	item_brand?: string;
	item_category?: string;
	item_category2?: string;
	item_category3?: string;
	item_category4?: string;
	item_category5?: string;
	item_variant?: string;
	price?: Currency;
	quantity?: number;
	index?: number;
	coupon?: string;
	item_list_name?: string;
	item_list_id?: string;
	discount?: Currency;
	affiliation?: string;
	creative_name?: string;
	creative_slot?: string;
	promotion_id?: string;
	promotion_name?: string;
	location_id?: string;
}
