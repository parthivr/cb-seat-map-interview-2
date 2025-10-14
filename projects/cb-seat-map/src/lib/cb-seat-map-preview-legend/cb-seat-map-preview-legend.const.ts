import type { CbSeatProduct } from '@cb-client-libraries/common-interfaces';
import { JbSeatType } from 'jb-component-library';

import type { CbSelectSeatCmsContent } from '../cb-seat-selection-cms-content-service/cb-seat-selection-cms-content.const';

/**
 * A string literal type for the `CbSeatProduct` enum, temporarily used until
 * the CB team can fix the transitive dependency issue when importing the enum
 * directly.
 *
 * @see {@link CbSeatProduct}
 */
export type CbSeatProductLiteral = `${Exclude<CbSeatProduct, 'UNKNOWN'>}`;

export const ALL_CB_SEAT_PRODUCTS: readonly CbSeatProductLiteral[] = [
  'CORE',
  'EVEN_MORE',
  'EXTRA_LEGROOM',
  'MINT_STUDIO',
  'MINT_SUITE',
  'MINT',
  'PREFERRED',
] as const;

/**
 * An array of seat product configs for the seat map preview legend.
 *
 * This is intentionally sorted by the order of the seat products that we
 * want to display, from most to least premium.
 */
export const SEAT_PREVIEW_LEGEND_CONFIGS: readonly {
  cbSeatProduct: CbSeatProductLiteral;
  cmsKey: keyof CbSelectSeatCmsContent;
  jbSeatType: JbSeatType;
}[] = [
  {
    cbSeatProduct: 'MINT_STUDIO',
    cmsKey: 'mintStudioText',
    jbSeatType: JbSeatType.mintStudio,
  },
  {
    cbSeatProduct: 'MINT_SUITE',
    cmsKey: 'mintSuiteText',
    jbSeatType: JbSeatType.mintSuite,
  },
  {
    cbSeatProduct: 'MINT',
    cmsKey: 'mintText',
    jbSeatType: JbSeatType.mint,
  },
  {
    cbSeatProduct: 'EVEN_MORE',
    cmsKey: 'evenMore',
    jbSeatType: JbSeatType.evenMore,
  },
  {
    cbSeatProduct: 'EXTRA_LEGROOM',
    cmsKey: 'extraLegroom',
    jbSeatType: JbSeatType.extraLegroom,
  },
  {
    cbSeatProduct: 'PREFERRED',
    cmsKey: 'preferredText',
    jbSeatType: JbSeatType.preferred,
  },
  {
    cbSeatProduct: 'CORE',
    cmsKey: 'coreText',
    jbSeatType: JbSeatType.core,
  },
] as const;
