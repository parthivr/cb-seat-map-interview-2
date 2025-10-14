import { HttpClient } from '@angular/common/http';
import { inject, Injectable, isDevMode } from '@angular/core';
import {
  catchError,
  distinctUntilChanged,
  filter,
  of,
  shareReplay,
  type Observable,
} from 'rxjs';

import { log } from '../internal/log.util';
import { isSafePopulated } from '../internal/safe-parse.util';
import {
  CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT,
  type CbSeatSelectionCmsContent,
} from './cb-seat-selection-cms-content.const';

@Injectable({
  providedIn: 'root',
})
export class CbSeatSelectionCmsContentService {
  private readonly httpClient = inject(HttpClient);
  private readonly seatSelectionCmsUrl = this.buildSeatSelectionCmsUrl();

  /**
   * @returns The CMS seat selection content as an observable. Returns a
   * fallback of the latest cached content if the CMS server is not available.
   *
   * @see {@link CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT}
   */
  getContent(): Observable<CbSeatSelectionCmsContent> {
    return this.httpClient
      .get<CbSeatSelectionCmsContent>(this.seatSelectionCmsUrl)
      .pipe(
        distinctUntilChanged(),
        filter(isSafePopulated),
        catchError((error) => {
          log.warn(
            '[CbSeatSelectionCmsContentService] Failed to fetch CMS content at ' +
              `${this.seatSelectionCmsUrl}. Defaulting to fallback data. Error:`,
            error
          );

          return of(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT);
        }),

        // Share cached processed content across subscribers
        shareReplay(1)
      );
  }

  private buildSeatSelectionCmsUrl(): string {
    const apiPath =
      '/resp-magnoliapublic/.rest/jetblue/v4/en/page/home/seat-selection?depth=2';

    // Use the dev instance in localhost, otherwise default to the respective
    // instance for which this library is consumed.
    const origin = isDevMode() ? 'https://www-dev2.jetblue.com' : '';

    return `${origin}${apiPath}`;
  }
}
