import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
  Output,
  inject,
  type OnInit,
  type SimpleChanges,
} from '@angular/core';
import {
  JbButtonModule,
  JbSeatModule,
  JbSeatState,
} from 'jb-component-library';

import {
  CabinTypeEnum,
  CbSeatTypeEnum,
  type CbCabin,
  type CbSeat,
  type CbSeatMap,
  type CbSeatRow,
  type CmsContent,
  type LearnMorePanelDetails,
} from '../cb-seat-map/cb-seat-map.types';
import { JbEnums } from '../internal/jb-enums.const';
import { log } from '../internal/log.util';
import {
  isSafeEmpty,
  isSafePopulated,
  safeParseNumber,
} from '../internal/safe-parse.util';

@Component({
  selector: 'cb-seats',
  templateUrl: './cb-seats.component.html',
  styleUrls: ['./cb-seats.component.scss'],
  standalone: true,
  imports: [CommonModule, JbButtonModule, JbSeatModule],
})
export class CbSeatsComponent implements OnInit {
  @Input() preview: boolean;
  @Input() rotation: string;
  @Input() seatMap: CbSeatMap = {};
  @Input() travelerData: any;
  @Input() currentLeg: string;
  @Input() selectedSeatsArr: any[] = []; // This is the array of selected seats for the current leg
  @Input() selection: boolean;
  @Input() currentTraveler: any;
  @Input() cmsCommonText: CmsContent;
  @Input() cmsMint: CmsContent;
  @Input() shouldDownscalePreview: boolean = false;

  @Output() selectedSeat = new EventEmitter<CbSeat | null>();
  @Output() detailsEmitter = new EventEmitter<LearnMorePanelDetails>();

  previousSeat: CbSeat | null;
  labels = CbSeatTypeEnum;
  JbEnums = JbEnums;

  private readonly localeId: string = inject(LOCALE_ID);

  private seatCostFormatter: Intl.NumberFormat;

  @Input('transform') transform: string;

  trackByRowId(_index: number, row: CbSeatRow): string {
    return row?.number;
  }

  trackBySeatId(_index: number, seat: CbSeat): string {
    return seat?.seatNum;
  }

  trackByCabinId(_index: number, cabin: CbCabin): string {
    return cabin?.cabinType;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkSeat();
  }

  checkSeat() {}

  getSeatInfo(seat: CbSeat): CbSeat | undefined {
    for (const cabin of this.seatMap.cabins) {
      for (const row of cabin.rows) {
        const found = row.cols.find((s) => seat == s);

        if (found) return found;
      }
    }
    return undefined;
  }

  selectSeat(seat: CbSeat) {
    if (!this.selection || this.preview) {
      return;
    }

    const currentTravelerInitials = this.currentTraveler?.initials ?? '';

    const isSeatOccupiedByOtherTraveler =
      isSafePopulated(seat?.initials) &&
      seat.initials !== currentTravelerInitials;

    const isSeatSelectedByCurrentTraveler =
      seat.initials === currentTravelerInitials;

    if (isSeatOccupiedByOtherTraveler) {
      return;
    }

    // Only allow the current traveler to deselect their own seat
    if (isSeatSelectedByCurrentTraveler) {
      this.deselectSeat(seat);
      return;
    }

    this.selectNewSeat(seat, currentTravelerInitials);
  }

  private deselectSeat(seat: CbSeat) {
    seat.available = 'available';
    seat.initials = '';

    this.previousSeat = null;
    this.selectedSeat.emit(seat);
  }

  private selectNewSeat(seat: CbSeat, travelerInitials: string) {
    // Clear the traveler's previously selected seat
    if (this.previousSeat) {
      this.previousSeat.available = 'available';
      this.previousSeat.initials = '';
    }

    // Select the new seat
    seat.available = 'selected';
    seat.initials = travelerInitials;

    this.previousSeat = seat;
    this.selectedSeat.emit(seat);
  }

  isNoSeat(seat: CbSeat): boolean {
    if (!!seat && !!seat.type) {
      return seat.type === 'NO_SEAT';
    }

    return false;
  }

  // checkAvaiablity(seatNum: any, seatArr: any): string {
  //   if (seatArr.includes(seatNum)) {
  //     return 'available';
  //   } else {
  //     return 'disabled';
  //   }
  // }

  returnAvailable(seat: CbSeat): JbSeatState {
    return seat.available === 'selected'
      ? JbSeatState.selected
      : seat.available === 'available'
      ? JbSeatState.available
      : JbSeatState.disabled;
  }

  showExitText(row: CbSeatRow): boolean {
    return row.cols.some((seat) => seat.exitSeat);
  }

  isValidCost(cost: string | number | null | undefined): boolean {
    return cost !== '' && cost !== null && !isNaN(+cost);
  }

  showEMSCabinDesc(cabin: CbCabin): boolean {
    return cabin.cabinType === CabinTypeEnum.economy && !this.preview;
  }

  clickOnCabinDetailsLink(cabinType) {
    this.detailsEmitter.emit({
      seatType: cabinType,
      isOpen: true,
      from: 'details',
    });
  }

  formatSeatDisplayCost(seat: CbSeat): string {
    if (isSafeEmpty(seat) || !this.isValidCost(seat.cost)) {
      return '';
    }

    return this.formatPrice(seat);
  }

  private formatPrice(seat: CbSeat): string {
    const isPointsRedemption = seat.currency === 'FFCURRENCY';

    if (!this.seatCostFormatter && isPointsRedemption) {
      this.seatCostFormatter = new Intl.NumberFormat(this.localeId ?? 'en-US', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
        style: 'decimal',
        useGrouping: true,
      });
    } else if (!this.seatCostFormatter && !isPointsRedemption) {
      this.seatCostFormatter = new Intl.NumberFormat(this.localeId ?? 'en-US', {
        currency: seat.currency ?? 'USD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
        style: 'currency',
      });
    }

    const parsedCostNumber = safeParseNumber(seat.cost);

    if (isPointsRedemption) {
      const formattedPoints = this.seatCostFormatter.format(parsedCostNumber);

      return `${formattedPoints} points`;
    }

    return this.seatCostFormatter.format(parsedCostNumber);
  }

  ngOnInit(): void {
    log.debug('seat data', this.seatMap);
  }
}
