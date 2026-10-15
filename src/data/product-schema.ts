import { siteConfig } from './site-core';
import { MONEY_PATH } from './seo-canonical';

/** Canonical product URL for schema and review itemReviewed. */
export const productPageUrl = new URL(MONEY_PATH, siteConfig.url).href;

/** Single Product @id sitewide — home, /d2-cheats/, and reviews reference this. */
export const productSchemaId = `${siteConfig.url}/#product`;
