import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  inject,
  isDevMode,
  type OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { CbSeatMapResponseSuccess } from '@cb-client-libraries/seat-service-interfaces';
import {
  JbDialogModule,
  JbDialogService,
  JbSelectModule,
} from 'jb-component-library';

import { CbSeatMapDialogComponent } from '../cb-seat-map-dialog/cb-seat-map-dialog.component';
import { DialogBox } from '../cb-seat-map-dialog/cb-seat-map-dialog.type';
import { HeadsUpDetailEnum } from '../cb-seat-map-heads-up-panel/cb-seat-map-heads-up-panel.const';
import { CbSeatMapLearnMoreDrawerComponent } from '../cb-seat-map-learn-more-drawer/cb-seat-map-learn-more-drawer.component';
import { CbSeatMapLegendComponent } from '../cb-seat-map-legend/cb-seat-map-legend.component';
import { CbSeatMapTravelerPanelComponent } from '../cb-seat-map-traveler-panel/cb-seat-map-traveler-panel.component';
import {
  CbSeatType,
  CbSeatTypeEnum,
  seatClassName,
  type CbSeat,
  type CbSeatMap,
  type CbSeatSelectionData,
  type CmsContent,
  type LearnMorePanelDetails,
} from '../cb-seat-map/cb-seat-map.types';
import { CbSeatSelectionCmsContentService } from '../cb-seat-selection-cms-content-service/cb-seat-selection-cms-content.service';
import { CbSeatsComponent } from '../cb-seats/cb-seats.component';
import { JbDialogVariantTypeEnum, JbEnums } from '../internal/jb-enums.const';
import { log } from '../internal/log.util';
import {
  areAllSafePopulated,
  isSafeEmpty,
  isSafePopulated,
  safeParseNumber,
} from '../internal/safe-parse.util';

@Component({
  selector: 'cb-seat-map-section',
  templateUrl: './cb-seat-map-section.component.html',
  styleUrls: ['./cb-seat-map-section.component.scss'],
  standalone: true,
  imports: [
    CbSeatMapLearnMoreDrawerComponent,
    CbSeatMapLegendComponent,
    CbSeatMapTravelerPanelComponent,
    CbSeatsComponent,
    CommonModule,
    JbSelectModule,
    ReactiveFormsModule,
    JbDialogModule,
  ],
})
export class CbSeatMapSectionComponent implements OnInit {
  private readonly cbSeatSelectionCmsContentService = inject(
    CbSeatSelectionCmsContentService
  );
  private readonly dialogService = inject(JbDialogService);
  private readonly destroyRef = inject(DestroyRef);

  @Input() seatData: CbSeatMapResponseSuccess;
  @Input() seatSelectedData: CbSeatMapResponseSuccess;
  @Input() preview: boolean;
  @Input() selection: boolean;
  @Input() svgwidth: string = '500px';
  @Input() svgheight: string = '500px';
  @Input() img: string = '';
  @Input() rotation: string = '';
  @Input() legend: boolean = true;
  @Input() shouldDownscalePreview: boolean = false;
  @Output() selectedSeatsArrEmit = new EventEmitter<CbSeatSelectionData[]>();
  @ViewChild('imgContainer') imgContainer: ElementRef;
  transformStr: string;

  seatsSelectedReturningData = false;
  seatMap: CbSeatMap = {};
  isPreferredSeatsEnabled = false;
  travelerData: any;
  currentTraveler: any;
  travelerIndex: number = 0;
  currentLeg: any;
  selectedSeatsArr: CbSeatSelectionData[] = [];
  buttonText: string = 'Next flight';
  legIndex: number = 0;
  legs: any = [];
  ddControl = new FormControl();
  isMint: boolean = false;
  isUMNR: boolean = false;
  JbEnums = JbEnums;
  aircraftImageUrl: string = '';
  isLearnmorePanelOpened: boolean = false;
  onLearnMorePanelClick: LearnMorePanelDetails;
  seatSelectionCmsContent: CmsContent = {};
  evenMoreSeatSelectionLabels = {
    title: 'Seat selection is required for your fare',
    content: 'Please choose seats for all travelers before proceeding.',
    primaryButton: 'Select seat',
  };
  noOfTravelerSeatRequired: number = 0;

  constructor(public el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.transformStr = '';
      if (this.preview) {
        this.transformStr = this.centerSeatsPreview();
      } else if (this.rotation == 'horizontal') {
        this.transformStr = this.centerSeatsHoriz();
      } else {
        this.transformStr = this.centerSeatsVert();
      }
    }, 100); // Increased delay to ensure DOM is fully rendered
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.transformStr = '';
    if (this.preview) {
      this.transformStr = this.centerSeatsPreview();
    } else if (this.rotation == 'horizontal') {
      this.transformStr = this.centerSeatsHoriz();
    } else {
      this.transformStr = this.centerSeatsVert();
    }
  }

  centerSeatsPreview(): string {
    const seatMapContainer = this.imgContainer?.nativeElement as HTMLElement;

    if (isSafeEmpty(seatMapContainer)) {
      return '';
    }

    const seatMapDiv = seatMapContainer.querySelector(
      'cb-seats div.seat-map'
    ) as HTMLElement;

    if (isSafeEmpty(seatMapDiv)) {
      return '';
    }

    // e.g.) 150px tall for flight detail card
    const containerHeight = seatMapContainer.clientHeight;

    // e.g.) 500px wide for flight detail card
    const containerWidth = seatMapContainer.clientWidth;

    // e.g.) 2000px tall for A320 plane
    let fullSeatMapHeight = seatMapDiv.scrollHeight || seatMapDiv.offsetHeight;

    // e.g.) 330px wide for A320 plane
    let fullSeatMapWidth = seatMapDiv.scrollWidth || seatMapDiv.offsetWidth;

    if (
      !containerHeight ||
      !containerWidth ||
      !fullSeatMapHeight ||
      !fullSeatMapWidth
    ) {
      return '';
    }

    // By default, calculate the downscale factor based on vertical orientation
    let scale = containerHeight / fullSeatMapHeight;

    if (this.rotation === 'horizontal') {
      // Use the container width instead of height when calculating downscale
      // factor because we need to fit the seat map within the container width.
      // Using container height would result in a too small scale.
      scale = containerWidth / fullSeatMapHeight;
    }

    // Apply a 10% padding to the scale factor
    scale *= 0.9;

    // e.g.) scale(0.225) for flight detail card
    const transformCssValue = `scale(${scale})`;

    return this.rotation === 'horizontal'
      ? // The front of the plane will face the left
        `rotate(-90deg) ${transformCssValue}`
      : transformCssValue;
  }

  centerSeatsHoriz() {
    if (this.imgContainer?.nativeElement) {
      const seatMapDiv = this.imgContainer.nativeElement.querySelector(
        'cb-seats div.seat-map'
      ) as HTMLElement;
      if (!seatMapDiv?.lastElementChild) {
        return '';
      }
      const lastDivChildInSeatMapStyles = getComputedStyle(
        seatMapDiv.lastElementChild
      );

      //DOM measurements
      const imgContainerHeight = this.imgContainer.nativeElement.clientHeight;
      const imgContainerWidth = this.imgContainer.nativeElement.clientWidth;
      // get height without padding
      const seatMapDivHeight =
        seatMapDiv.clientHeight -
        safeParseNumber(lastDivChildInSeatMapStyles?.paddingBottom);
      // get width without padding
      const seatMapDivWidth =
        seatMapDiv.clientWidth -
        safeParseNumber(lastDivChildInSeatMapStyles?.paddingRight) -
        safeParseNumber(lastDivChildInSeatMapStyles?.paddingLeft);

      //seatmap rotated 270 degrees, so its height becomes its width
      const heightScale = imgContainerHeight / seatMapDivWidth;
      // rotated 270 degrees so seatmap height becomes its width
      const widthScale = imgContainerWidth / seatMapDivHeight;
      const scale = Math.min(heightScale, widthScale) / 2;
      const scaledWidth = seatMapDivWidth * scale;
      const scaledHeight = seatMapDivHeight * scale;

      // calculate translateX values to center the seat map
      let translateX = (imgContainerHeight - scaledWidth) / 2;
      // width is height in this case when its rotated 270
      translateX += scaledWidth;
      translateX /= scale;

      // calculate translateY value
      let translateY = (imgContainerWidth - scaledHeight) / 2;
      translateY /= scale;
      // Adjust translateX to move slightly left of center
      let offsetToLeft = 50; // Adjust this value to control how much to move left (better for centering within the plane)
      translateY -= offsetToLeft / scale;

      return `rotate(270deg) scale(${scale}) translateX(-${translateX}px) translateY(${translateY}px)`;
    } else {
      return '';
    }
  }

  centerSeatsVert() {
    if (this.imgContainer?.nativeElement) {
      const seatMap = this.imgContainer.nativeElement.querySelector(
        'cb-seats'
      ) as HTMLElement;
      const seatMapDiv = seatMap?.querySelector('div.seat-map') as HTMLElement;
      if (isSafeEmpty(seatMapDiv?.lastElementChild)) {
        return '';
      }
      const lastDivChildInSeatMapStyles = getComputedStyle(
        seatMapDiv.lastElementChild
      );

      const imgContainerHeight = this.imgContainer.nativeElement.clientHeight;
      const imgContainerWidth = this.imgContainer.nativeElement.clientWidth;

      // get height without padding
      const seatMapDivHeight =
        seatMapDiv.clientHeight -
        safeParseNumber(lastDivChildInSeatMapStyles?.paddingBottom);
      // get width without padding
      const seatMapDivWidth =
        seatMapDiv.clientWidth -
        safeParseNumber(lastDivChildInSeatMapStyles?.paddingRight) -
        safeParseNumber(lastDivChildInSeatMapStyles?.paddingLeft);

      //set scaling
      const heightScale = imgContainerHeight / seatMapDivHeight;
      const widthScale = imgContainerWidth / seatMapDivWidth;
      const scale = Math.min(heightScale, widthScale) / 1.7;

      //special conditions for scale Y
      if (seatMapDivHeight >= 2236 && seatMapDivHeight <= 2241) {
        return `scale(${scale}) scaleY(1.1)`;
      } else if (seatMapDivHeight == 1989) {
        return `scale(${scale}) scaleY(1.18)`;
      }

      //special conditions for smaller aircrafts
      if (seatMapDivWidth == 217) {
        return 'scale(0.788235) scaleY(1.06)';
      } else if (seatMapDivWidth == 265) {
        return 'scale(0.688235) scaleY(1.12)';
      }

      return `scale(${scale}) `;
    } else {
      return '';
    }
  }

  setActiveTraveler(traveler: any) {
    if (isSafeEmpty(traveler)) {
      return;
    }

    this.setTravlersFalse();
    traveler.isActive = true;
    this.currentTraveler = traveler;
    this.travelerIndex = traveler?.index ?? 0;
    this.createSeatData();
  }

  submit() {
    log.debug('Emitting `selectedSeatsArr` event:', this.selectedSeatsArr);
    if (!this.isEmsSeatFullySelected()) {
      this.onClickSeatSelection();
      return;
    }
    this.selectedSeatsArrEmit.emit(this.selectedSeatsArr);
  }

  iterateTravOrLeg() {
    if (!this.isEmsSeatFullySelected()) {
      this.onClickSeatSelection();
      return;
    }
    this.legIndex++;
    this.ddControl?.setValue(this.legIndex);
    this.travelerIndex = 0;
    this.createTravelerData();
    this.buttonText = 'Next flight';
  }

  iteratePrevLeg() {
    if (this.legIndex > 0) {
      this.legIndex--;
      this.ddControl?.setValue(this.legIndex);
      this.createTravelerData();
    }
  }

  findTravelerInArray() {
    let trav: any;
    if (isSafePopulated(this.selectedSeatsArr)) {
      this.selectedSeatsArr.forEach((traveler: any) => {
        if (
          traveler?.traveler?.index == this.currentTraveler?.index &&
          traveler?.leg == this.currentLeg
        ) {
          trav = traveler;
        }
      });
    }
    return trav;
  }

  selectedSeat(seat: CbSeat | null) {
    log.debug('selecting seat', seat);

    // Handle deselection case (when seat is null or when seat has empty initials indicating deselection)
    if (seat === null || seat?.initials === '') {
      this.handleSeatDeselection();
      return;
    }

    // Handle seat selection
    if (this.findTravelerInArray()) {
      this.findTravelerInArray().seat = seat;
      this.createSeatData();
    } else {
      this.selectedSeatsArr.push({
        traveler: this.currentTraveler,
        seat: seat as unknown as CbSeatSelectionData['seat'],
        leg: this.currentLeg,
      });
    }

    this.advanceToNextTraveler();
  }

  private handleSeatDeselection() {
    const currentTravelerSeatIndexForSegment = this.selectedSeatsArr.findIndex(
      (travelerSeat) =>
        travelerSeat.traveler?.index === this.currentTraveler?.index &&
        travelerSeat.leg === this.currentLeg
    );

    if (currentTravelerSeatIndexForSegment !== -1) {
      const currentTravelerSelectedSeat =
        this.selectedSeatsArr[currentTravelerSeatIndexForSegment];

      const seatNumberToDeselect = currentTravelerSelectedSeat.seat?.seatNum;

      const wasSeatOriginallyAssignedToTraveler =
        this.seatData?.data?.[this.legIndex]?.travelers?.[
          this.currentTraveler?.index
        ]?.selectedSeat?.seat === seatNumberToDeselect;

      if (
        wasSeatOriginallyAssignedToTraveler &&
        currentTravelerSelectedSeat.seat
      ) {
        // Seat was originally assigned, so set seatNum to null to send a
        // seat deselect operation to the API
        currentTravelerSelectedSeat.seat.seatNum = null;

        log.debug('Seat deselected for traveler with original assignment:', {
          travelerIndex: this.currentTraveler?.index,
          leg: this.currentLeg,
          originalSeat: seatNumberToDeselect,
          modifiedSeat: currentTravelerSelectedSeat.seat,
        });
      } else {
        // Seat was never originally assigned, so completely remove the entry
        this.selectedSeatsArr.splice(currentTravelerSeatIndexForSegment, 1);

        log.debug(
          'Removed seat selection for traveler with no original assignment:',
          {
            travelerIndex: this.currentTraveler?.index,
            leg: this.currentLeg,
            seatNumber: seatNumberToDeselect,
          }
        );
      }

      this.createSeatData(); // Refresh the seat map to reflect changes
    }
  }

  private advanceToNextTraveler() {
    const travelers = this.travelerData?.travelers;

    if (isSafePopulated(travelers)) {
      const currentIndex = this.currentTraveler?.index ?? -1;
      const nextTravelerIndex = currentIndex + 1;

      if (nextTravelerIndex < travelers.length) {
        const nextTraveler = travelers[nextTravelerIndex];

        // Only advance if the next traveler is a regular traveler
        if (
          !['EXTRA_SEAT', 'EXTRA_SEAT_MUS_INST'].includes(
            nextTraveler?.extendedType
          )
        ) {
          this.setActiveTraveler(nextTraveler);
        }
      }
    }
  }

  setInitialTraveler() {
    if (isSafeEmpty(this.travelerData?.travelers?.[0])) {
      return;
    }
    this.travelerData.travelers[0].isActive = true;
    this.currentTraveler = this.travelerData.travelers[0];
    this.isUMNR =
      this.currentTraveler?.extendedType === HeadsUpDetailEnum.UMNR_SEAT;
    this.travelerData.travelers.forEach((traveler: any, i: number) => {
      if (isSafePopulated(traveler)) traveler.index = i;
    });
  }

  setTravlersFalse() {
    this.travelerData?.travelers?.forEach((traveler: any) => {
      if (isSafePopulated(traveler)) traveler.isActive = false;
    });
  }

  parseLeft(layout: any, side: string) {
    if (isSafeEmpty(layout) || !Array.isArray(layout)) {
      return [];
    }
    var leftIndex = layout.indexOf('LEFT_SIDE');
    var aisleIndex = layout.indexOf('AISLE');
    var rightIndex = layout.indexOf('RIGHT_SIDE');
    var arr = [];

    if (side == 'left') {
      arr = layout.slice(leftIndex + 1, aisleIndex);
    } else if (side == 'right') {
      arr = layout.slice(aisleIndex + 1, rightIndex);
    }

    return arr;
  }
  seatSide(column: string, leftSide: string[], rightSide: string[]) {
    if (leftSide?.includes(column)) {
      return 'left';
    } else if (rightSide?.includes(column)) {
      return 'right';
    } else {
      return 'center';
    }
  }

  isNoSeat(seat: CbSeat): boolean {
    if (!!seat && !!seat.type) {
      return seat.type === 'NO_SEAT';
    }
    // if (
    //   this.travelerIndex != null &&
    //   !!seat.travelerSeatRefUri[this.travelerIndex]
    // ) {
    //   return seat.travelerSeatRefUri[this.travelerIndex].type === 'NO_SEAT';
    // }
    return false;
  }

  checkAvaiablity(seatNum: any, seatArr: any): string {
    if (
      Array.isArray(seatArr) &&
      seatArr.includes(seatNum) &&
      !this.checkSelected(seatNum)
    ) {
      return 'available';
    } else if (this.checkSelectedCurrent(seatNum)) {
      return 'selected';
    } else {
      return 'disabled';
    }
  }

  checkSelectedCurrent(seatNum: any): boolean {
    let selected = false;
    if (isSafePopulated(this.selectedSeatsArr)) {
      this.selectedSeatsArr.forEach((traveler: any) => {
        if (
          traveler?.seat?.seatNum == seatNum &&
          traveler?.leg == this.currentLeg &&
          traveler?.traveler?.index == this.currentTraveler?.index
        ) {
          selected = true;
        }
      });
    }
    return selected;
  }

  checkSelected(seatNum: any): boolean {
    let selected = false;
    if (isSafePopulated(this.selectedSeatsArr)) {
      this.selectedSeatsArr.forEach((traveler: any) => {
        if (
          traveler?.seat?.seatNum == seatNum &&
          traveler?.leg == this.currentLeg
        ) {
          selected = true;
        }
      });
    }
    return selected;
  }

  setAmount(seat: CbSeat, traveler: any) {
    //console.log(traveler);
    let amount = '';
    if (isSafePopulated(traveler?.offers?.[0]?.amount)) {
      traveler?.offers?.forEach((offer) => {
        if (offer?.seatNumber === seat?.number) {
          amount = Math.round(offer?.amount).toString();
        }
      });
    }
    return amount;
  }

  createSeatArr(arr: any) {
    let seatArr = [];
    (arr ?? []).forEach((seat) => {
      seatArr.push(seat?.seatNumber);
    });
    return seatArr;
  }

  returnAvailable(seat: CbSeat): string {
    return seat?.available ?? 'disabled';
  }

  hasName(travler: any): boolean {
    return areAllSafePopulated(travler?.name?.first, travler?.name?.last);
  }

  createTravelerData() {
    var seatmapData: any = this.seatData?.data?.[this.legIndex];
    if (isSafePopulated(seatmapData)) {
      const travData = {
        travelers: seatmapData?.travelers?.map((traveler) => ({
          type: traveler?.type,
          extendedType: traveler?.extendedType,
          name: this.hasName(traveler)
            ? { first: traveler?.name?.first, last: traveler?.name?.last }
            : { first: '', last: '' },
          initials: this.hasName(traveler)
            ? (traveler?.name?.first?.[0] ?? '') +
              (traveler?.name?.last?.[0] ?? '')
            : '',
          selectedSeat: traveler?.selectedSeat ? traveler?.selectedSeat : null,
          isActive: false,
          offers: traveler?.offers,
          availableSeats: this.createSeatArr(traveler?.offers),
        })),
      };
      this.travelerData = travData;
      this.noOfTravelerSeatRequired = travData?.travelers?.length ?? 0;
      this.setInitialTraveler();
      this.createSeatData();
    }
  }

  createSeatData() {
    log.debug('Received @Input `seatData`:', this.seatData);
    this.legs = [];
    this.seatData?.data?.forEach((section) => {
      this.legs.push(section?.leg);
    });
    var seatmapData: any = this.seatData?.data?.[this.legIndex];
    if (isSafePopulated(seatmapData) && this.currentLeg != seatmapData?.leg) {
      this.seatsSelectedReturningData = true;
    }
    this.currentLeg = seatmapData?.leg;
    const newSeatmapData = {
      //aircraft: seatmapData.aircraft,
      cabins: seatmapData?.aircraft?.cabins?.map((cabin) => ({
        leftSide: this.parseLeft(cabin?.layout, 'left'),
        rightSide: this.parseLeft(cabin?.layout, 'right'),
        cabinType: cabin?.cabinClass,
        rows: cabin?.rows?.map((row) => {
          const isMint =
            ['MINT', 'MINT_STUDIO', 'MINT_SUITE'].indexOf(
              row?.slots?.[0]?.seatProduct
            ) !== -1;
          if (isMint) {
            this.isMint = true;
          }
          const isMintStudio = row?.slots?.[0]?.seatProduct === 'MINT_STUDIO';
          const isMintSuite = row?.slots?.[0]?.seatProduct === 'MINT_SUITE';
          const displaySeatTypeForRow =
            row?.slots?.[0]?.seatProduct === 'EVEN_MORE_SPACE'
              ? 'ems'
              : row?.slots?.[0]?.seatProduct === 'EVEN_MORE'
              ? 'evenMore'
              : row?.slots?.[0]?.seatProduct === 'PREFERRED'
              ? 'preferred'
              : row?.slots?.[0]?.seatProduct === 'EXTRA_LEGROOM'
              ? 'extraLegroom'
              : isMintStudio
              ? 'mintStudio'
              : isMintSuite
              ? 'mintSuite'
              : isMint
              ? 'mint'
              : 'core';
          return {
            number: row?.number,
            aisleIndex: (row?.slots?.length ?? 0) / 2 - 1, // aisle is in the center
            displaySeatType: displaySeatTypeForRow,
            mintRow: isMint,
            cols: row?.slots?.map((seat) => ({
              evenMoreSpaceSeat: seat?.seatProduct === 'EVEN_MORE_SPACE',
              label: seat?.column,
              position: seat?.positions,
              seatNum: seat?.number,
              exitSeat: seat?.characteristics?.includes('EXIT_SEAT'),
              type:
                seat?.type === 'NO_SEAT'
                  ? 'NO_SEAT'
                  : seat?.available === false
                  ? 'OCCUPIED'
                  : seat?.type,
              cost: this.setAmount(
                seat,
                this.travelerData?.travelers?.[this.travelerIndex]
              ),
              currency:
                this.travelerData?.travelers?.[this.travelerIndex]?.offers?.[0]
                  ?.currency ?? 'USD',
              initials: this.checkForSeatAlreadySelected(seat),
              travelerSeatRefUri: [],
              available:
                this.checkForSeatAlreadySelected(seat) == ''
                  ? this.checkAvaiablity(
                      seat?.number,
                      this.travelerData?.travelers?.[this.travelerIndex]
                        ?.availableSeats
                    )
                  : 'selected',
              iconCode: seat?.seatProduct,
              seatInfo: `${seat?.number} ${seat?.type} ${seat?.column} ${seat?.position}`,
              displaySeatType:
                seat?.seatProduct === CbSeatType.Preferred &&
                this.isPreferredSeatsEnabled
                  ? CbSeatTypeEnum.PREFERRED
                  : displaySeatTypeForRow,
            })),
          };
        }),
      })),
    };
    newSeatmapData?.cabins?.forEach((cabin) => {
      cabin?.rows?.forEach((row) => {
        row?.cols?.forEach((col) => {
          col.side = this.seatSide(
            col?.label,
            cabin?.leftSide,
            cabin?.rightSide
          );
        });
      });
    });
    this.seatMap = newSeatmapData;
    log.debug('Created `seatMap`:', this.seatMap);

    // Recalculate transform for preview mode after seatMap data is available
    if (this.preview) {
      setTimeout(() => {
        this.transformStr = this.centerSeatsPreview();
      }, 50);
    }

    if (this.seatsSelectedReturningData) {
      this.preAssignSeats();
    }
  }

  checkForSeatAlreadySelected(seat: any) {
    if (!seat) return '';
    const selected = this.selectedSeatsArr.find(
      (s) =>
        s?.seat &&
        s?.seat?.seatNum === seat?.number &&
        s?.leg === this.currentLeg
    );
    return selected ? selected.traveler?.initials ?? '' : '';
  }

  preAssignSeats() {
    for (let trav of this.travelerData?.['travelers'] ?? []) {
      const seatOnMap = this.getSeatInfo(trav?.selectedSeat?.seat);

      if (seatOnMap) {
        seatOnMap.available = 'selected';
        seatOnMap.initials = trav?.initials;
      }

      const alreadyHasSeat = this.selectedSeatsArr.some(
        (obj) =>
          obj?.traveler?.index === trav?.index && obj?.leg === this.currentLeg
      );

      if (!alreadyHasSeat && seatOnMap) {
        this.selectedSeatsArr.push({
          traveler: trav,
          seat: seatOnMap as unknown as CbSeatSelectionData['seat'],
          leg: this.currentLeg,
        });
      }
    }
    this.seatsSelectedReturningData = false; //reset this so we don't keep doing this need to make a flag that does this when a new leg is selected
  }

  getSeatInfo(seat: string): CbSeatSelectionData['seat'] | undefined {
    for (const cabin of this.seatMap?.cabins ?? []) {
      for (const row of cabin?.rows ?? []) {
        const found = row?.cols?.find((s) => seat == s?.seatNum);

        if (found) return found;
      }
    }
    return undefined;
  }

  highlightScrollToCenter(seatTypeInput: CbSeatTypeEnum, time = 0): void {
    setTimeout(() => {
      const targetElement = this.el.nativeElement.querySelector(
        seatClassName[seatTypeInput]
      );
      if (isSafePopulated(targetElement)) {
        const offset =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          window.innerHeight / 8 -
          100;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, time);
  }

  toggleLearnMorePanel(panelDetails: LearnMorePanelDetails) {
    this.isLearnmorePanelOpened = panelDetails?.isOpen ?? false;
    this.onLearnMorePanelClick = panelDetails;
    if (panelDetails?.isOpen) {
      this.highlightScrollToCenter(panelDetails?.seatType);
      this.onLearnMorePanelClick = panelDetails;
    }
  }

  setCmsContent() {
    this.cbSeatSelectionCmsContentService
      .getContent()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cmsSeatSelectionCmsContent) => {
        log.debug(
          '[CbSeatMapLegendComponent] CMS seat selection content:',
          cmsSeatSelectionCmsContent
        );
        if (cmsSeatSelectionCmsContent) {
          this.seatSelectionCmsContent[
            cmsSeatSelectionCmsContent?.area?.[1]?.component?.[0]?.name
          ] = cmsSeatSelectionCmsContent?.area?.[1]?.component?.[0]?.data;
          cmsSeatSelectionCmsContent.children.forEach((section) => {
            this.seatSelectionCmsContent[section.name] =
              section.area[0].component[0].data;
          });
        }
      });
  }

  ngOnInit(): void {
    this.ddControl?.valueChanges?.subscribe((value) => {
      log.debug('Selected leg index:', value);
      this.legIndex = value;
      this.createTravelerData();
    });
    this.setCmsContent();

    /**
     * Initializes the seat data for the component based on the available input.
     * If `seatData` is provided and is a string, it is parsed as JSON.
     * If `seatData` is not available but `seatSelectedData` is provided, it is used instead;
     * if it is a string, it is parsed as JSON, otherwise it is assigned directly.
     * Also sets the `seatsSelectedReturningData` flag to true when using `seatSelectedData`.
     */
    if (this.seatData) {
      if (typeof this.seatData === 'string') {
        this.seatData = JSON.parse(this.seatData);
      }
    } else if (this.seatSelectedData) {
      if (typeof this.seatSelectedData === 'string') {
        this.seatData = JSON.parse(this.seatSelectedData);
      } else {
        this.seatData = this.seatSelectedData;
        this.seatsSelectedReturningData = true;
      }
    }

    this.createTravelerData();
    log.debug('Created `seatData`:', this.seatData);
    if ((this.travelerData?.travelers?.length ?? 0) > 1) {
      this.buttonText = 'Next flight';
    }
    var svg = document.getElementById('acSvg');
    if (isSafePopulated(svg?.style)) {
      svg.style.height = this.svgheight;
      svg.style.width = this.svgwidth;
    }

    const relativeAircraftImagePath = `assets/seat-map/${this.img}`;

    this.aircraftImageUrl = isDevMode()
      ? `https://www-dev2.jetblue.com/booking/${relativeAircraftImagePath}`
      : relativeAircraftImagePath;
  }

  trackByLegId(
    _index: number,
    leg: CbSeatMapResponseSuccess['data'][number]['leg']
  ): string {
    return `${leg?.origin}-${leg?.destination}`;
  }

  isEmsSeatFullySelected(): boolean {
    const rbd =
      this.seatData?.data?.[this.legIndex]?.aircraft?.cabins?.[0]?.rbd;
    if (rbd === 'N') {
      const currentLegSeats = this.selectedSeatsArr.filter(
        (seat) => seat.leg === this.currentLeg
      );
      return currentLegSeats.length === this.noOfTravelerSeatRequired;
    }
    return true;
  }

  onClickSeatSelection(): void {
    const dialogData: DialogBox = {
      dialogType: JbDialogVariantTypeEnum.notification,
      title: this.evenMoreSeatSelectionLabels.title,
      content: this.evenMoreSeatSelectionLabels.content,
      primaryButton: this.evenMoreSeatSelectionLabels.primaryButton,
    };
    this.dialogService.openDialog(CbSeatMapDialogComponent, null, dialogData);
  }
}
