import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Input,
  type OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type {
  CbSeatMapResponseSuccess,
  CbSsSeat,
} from '@cb-client-libraries/seat-service-interfaces';
import {
  JbIconModule,
  JbLegendModule,
  JbSeatModule,
  JbSeatState,
  JbSeatType,
} from 'jb-component-library';
import type { ValueOf } from 'type-fest';

import {
  CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT,
  type CbSeatSelectionCmsContent,
  type CbSelectSeatCmsContent,
} from '../cb-seat-selection-cms-content-service/cb-seat-selection-cms-content.const';
import { CbSeatSelectionCmsContentService } from '../cb-seat-selection-cms-content-service/cb-seat-selection-cms-content.service';
import { isSafeEmpty, isSafePopulated } from '../internal/safe-parse.util';
import {
  SEAT_PREVIEW_LEGEND_CONFIGS,
  type CbSeatProductLiteral,
} from './cb-seat-map-preview-legend.const';

type SeatLegendConfig = {
  label: ValueOf<CbSelectSeatCmsContent>;
  jbSeatType: JbSeatType;
};

@Component({
  selector: 'cb-seat-map-preview-legend',
  standalone: true,
  imports: [CommonModule, JbIconModule, JbLegendModule, JbSeatModule],
  templateUrl: './cb-seat-map-preview-legend.component.html',
  styleUrls: ['./cb-seat-map-preview-legend.component.scss'],
})
export class CbSeatMapPreviewLegendComponent implements OnInit {
  private readonly cbSeatSelectionCmsContentService = inject(
    CbSeatSelectionCmsContentService
  );

  private readonly destroyRef = inject(DestroyRef);

  @Input() set seatMap(seatMapResponse: CbSeatMapResponseSuccess) {
    if (isSafePopulated(seatMapResponse?.data)) {
      this._seatMapResponse = seatMapResponse;
      this.initSeatProductConfigs();
    }
  }

  AVAILABLE_JB_SEAT_STATE = JbSeatState.available as const;
  availableSeatLegendConfigs: SeatLegendConfig[];

  private cbSeatSelectionCmsContent: CbSeatSelectionCmsContent =
    CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT;

  private _seatMapResponse: CbSeatMapResponseSuccess;

  ngOnInit(): void {
    this.initCmsContent();
  }

  trackByJbSeatType(
    _index: number,
    seatLegendConfig: SeatLegendConfig
  ): JbSeatType {
    return seatLegendConfig.jbSeatType;
  }

  private initCmsContent(): void {
    this.cbSeatSelectionCmsContentService
      .getContent()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cbSeatSelectionCmsContent) => {
        this.cbSeatSelectionCmsContent = cbSeatSelectionCmsContent;
        this.initSeatProductConfigs();
      });
  }

  private initSeatProductConfigs(): void {
    if (
      isSafeEmpty(this._seatMapResponse?.data) ||
      isSafeEmpty(this.cbSeatSelectionCmsContent)
    ) {
      return;
    }

    const availableCbSeatProducts = new Set<CbSeatProductLiteral>(
      this._seatMapResponse.data
        .flatMap((leg) => leg?.aircraft?.cabins ?? [])
        .flatMap((cabin) => cabin?.rows ?? [])
        .flatMap((row) => row?.slots ?? [])
        .map((slot) => (slot as CbSsSeat)?.seatProduct as CbSeatProductLiteral)
        .filter(isSafePopulated)
    );

    this.availableSeatLegendConfigs = SEAT_PREVIEW_LEGEND_CONFIGS.filter(
      ({ cbSeatProduct }) => availableCbSeatProducts.has(cbSeatProduct)
    ).map(({ cmsKey, jbSeatType }) => ({
      label: this.cbSeatSelectionCmsContent.area[1].component[0].data[cmsKey],
      jbSeatType,
    }));
  }
}
