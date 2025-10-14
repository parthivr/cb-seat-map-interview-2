import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  type OnInit,
} from '@angular/core';
import type {
  CbSeatMap,
  CbSeatMapResponseSuccess,
} from '@cb-client-libraries/seat-service-interfaces';
import { WINDOW } from 'jb-component-library';

import { CbSeatMapPreviewLegendComponent } from '../cb-seat-map-preview-legend/cb-seat-map-preview-legend.component';
import { CbSeatMapSectionComponent } from '../cb-seat-map-section/cb-seat-map-section.component';
import { log } from '../internal/log.util';
import { version } from '../internal/package-version.const';
import { isSafeEmpty, isSafePopulated } from '../internal/safe-parse.util';
import type { CbSeatSelectionData } from './cb-seat-map.types';

@Component({
  imports: [
    CommonModule,
    CbSeatMapPreviewLegendComponent,
    CbSeatMapSectionComponent,
  ],
  selector: 'cb-seat-map',
  standalone: true,
  styleUrls: ['./cb-seat-map.component.scss'],
  templateUrl: './cb-seat-map.component.html',
})
export class CbSeatMapComponent implements OnInit {
  @Input() img: string = '';
  @Input() rotation: string = '';

  @Input() set data(data: CbSeatMapResponseSuccess) {
    if (isSafePopulated(data)) {
      this._data = this.normalizeEvenMoreSeatProductNames(data);
    }
  }

  get data(): CbSeatMapResponseSuccess {
    return this._data;
  }

  @Input() set seatSelectedData(seatSelectedData: CbSeatMapResponseSuccess) {
    if (isSafePopulated(seatSelectedData)) {
      this._seatSelectedData =
        this.normalizeEvenMoreSeatProductNames(seatSelectedData);
    }
  }
  get seatSelectedData(): CbSeatMapResponseSuccess {
    return this._seatSelectedData;
  }

  @Input() preview: string | boolean;
  @Input() selection: string | boolean;
  @Input() legend: string | boolean;
  @Input() shouldDownscalePreview: boolean = false;
  @Input() shouldShowPreviewLegend: boolean = true;
  @Input() previewLegendPositin: 'top' | 'bottom' = 'top';
  @Output() selectedSeats = new EventEmitter<CbSeatSelectionData[]>();

  previewBool: boolean;
  selectionBool: boolean;
  legendBool: boolean;

  private _data: CbSeatMapResponseSuccess;
  private _seatSelectedData: CbSeatMapResponseSuccess;
  private window: Window = inject(WINDOW);

  ngOnInit(): void {
    this.initDebugInfo();

    if (`${this.preview}` === 'true') {
      this.previewBool = true;
    } else {
      this.previewBool = false;
    }
    if (`${this.selection}` === 'true') {
      this.selectionBool = true;
    } else {
      this.selectionBool = false;
    }
    if (`${this.legend}` === 'true') {
      this.legendBool = true;
    } else {
      this.legendBool = false;
    }
  }

  getSelectedSeatsArr(event: CbSeatSelectionData[]) {
    this.selectedSeats.emit(event);
  }

  private initDebugInfo(): void {
    log.info(`cb-seat-map version: ${version}`);

    // Even though this works locally, TS doesn't pick up the `global.d.ts` file
    // during the build process, hence the `@ts-ignore`.
    //
    // @ts-ignore - TS2339: Property '__CB_SEAT_MAP__' does not exist on type
    //   'Window'.
    this.window.__CB_SEAT_MAP__ = { version };
  }

  /**
   * Normalizes seat product names by converting "EVEN_MORE_SPACE" to
   * "EVEN_MORE".
   */
  private normalizeEvenMoreSeatProductNames(
    seatMapResponse: CbSeatMapResponseSuccess
  ): CbSeatMapResponseSuccess {
    if (isSafeEmpty(seatMapResponse?.data)) {
      return seatMapResponse;
    }

    const normalizedData: CbSeatMap[] = seatMapResponse.data.map(
      (flightData) => ({
        ...flightData,
        aircraft: {
          ...flightData.aircraft,
          cabins: flightData.aircraft?.cabins?.map((cabin) => ({
            ...cabin,
            rows: cabin.rows?.map((row) => ({
              ...row,
              slots: row.slots?.map((slot) => {
                if (slot?.type === 'NO_SEAT') {
                  return slot;
                }

                return {
                  ...slot,
                  seatProduct:
                    slot?.seatProduct === 'EVEN_MORE_SPACE'
                      ? 'EVEN_MORE'
                      : slot?.seatProduct,
                };
              }),
            })),
          })),
        },
      })
    );

    return {
      ...seatMapResponse,
      data: normalizedData,
    };
  }
}
