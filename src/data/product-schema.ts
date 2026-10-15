import { productInfo, siteConfig } from './site-core';
import { customerReviewStats } from './site';
import { MONEY_PATH } from './seo-canonical';

/** Canonical product URL for schema and review itemReviewed. */
export const productPageUrl = new URL(MONEY_PATH, siteConfig.url).href;

/** Single Product @id sitewide — home, /d2-cheats/, and reviews reference this. */
export const productSchemaId = `${siteConfig.url}/#product`;

/** Compact Product node for /d2-cheats/ — keeps verify-seo happy without a large JSON-LD payload. */
export function productSchemaNode(imageUrl: string): Record<string, unknown> {
	return {
		'@type': 'Product',
		'@id': productSchemaId,
		name: productInfo.name,
		description: productInfo.summary,
		image: imageUrl,
		brand: { '@type': 'Brand', name: productInfo.brand },
		url: productPageUrl,
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: customerReviewStats.averageRating.toFixed(1),
			reviewCount: String(customerReviewStats.onSiteCount),
			bestRating: '5',
			worstRating: '1',
		},
		offers: {
			'@type': 'AggregateOffer',
			lowPrice: Math.min(...productInfo.plans.map((p) => p.price)).toFixed(2),
			highPrice: Math.max(...productInfo.plans.map((p) => p.price)).toFixed(2),
			priceCurrency: productInfo.currency,
			offerCount: productInfo.plans.length,
			availability: 'https://schema.org/InStock',
			url: siteConfig.checkoutUrl,
		},
	};
}
