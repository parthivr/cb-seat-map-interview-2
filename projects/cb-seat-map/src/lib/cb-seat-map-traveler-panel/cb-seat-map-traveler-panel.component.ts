import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  type OnInit,
} from '@angular/core';
import {
  JbAvatarCardModule,
  JbAvatarModule,
  JbButtonModule,
  JbHorizontalScrollerModule,
  JbIconModule,
} from 'jb-component-library';

import { JbEnums } from '../internal/jb-enums.const';
import { log } from '../internal/log.util';
@Component({
  selector: 'cb-seat-map-traveler-panel',
  templateUrl: './cb-seat-map-traveler-panel.component.html',
  styleUrls: ['./cb-seat-map-traveler-panel.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    JbAvatarCardModule,
    JbAvatarModule,
    JbButtonModule,
    JbHorizontalScrollerModule,
    JbIconModule,
  ],
})
export class CbSeatMapTravelerPanelComponent implements OnInit {
  @Input() travelers: any;
  @Input() legIndex: number;
  @Input() seatData: any;
  @Input() buttonText: string;
  @Input() selectedSeatsArr: any;
  @Input() currentLeg: number;
  @Input() legs: any;
  @Output() setActiveTraveler = new EventEmitter<any>();
  @Output() iterateTravOrLeg = new EventEmitter<any>();
  @Output() iteratePrev = new EventEmitter<any>();
  @Output() submitEvent = new EventEmitter<any>();
  @Output() showSeatCard = new EventEmitter<any>();

  extraSeatInfo: any;
  extraSeats: boolean = false;
  JbEnums = JbEnums;

  constructor() {}

  iterateTravOrLegFunc() {
    this.iterateTravOrLeg.emit();
  }

  setActiveTravelerFunc(traveler: any) {
    this.setActiveTraveler.emit(traveler);
  }

  iteratePrevLegFunc() {
    this.iteratePrev.emit();
  }

  submitFunc() {
    this.submitEvent.emit();
  }

  showSeatCardFunc(traveler: any) {
    this.showSeatCard.emit(traveler);
  }

  showSelectedSeatCard(traveler: any): string {
    let seatNum = '';
    if (this.selectedSeatsArr.length > 0) {
      this.selectedSeatsArr.forEach((trav: any) => {
        if (
          traveler.index == trav.traveler.index &&
          trav.leg == this.currentLeg
        ) {
          seatNum = trav.seat.seatNum;
        }
      });
    }
    return seatNum;
  }

  findExtraSeats() {
    let previousTraveler: any = null;
    this.travelers.forEach((traveler: any) => {
      if (traveler.extendedType == 'EXTRA_SEAT') {
        if (previousTraveler) {
          this.extraSeats = true;
          this.extraSeatInfo = {
            initials: previousTraveler.initials,
            name: previousTraveler.name.first,
          };
        }
      }
      if (traveler.extendedType == 'EXTRA_SEAT_MUS_INST') {
        this.extraSeats = true;
        this.extraSeatInfo = {
          initials: 'MI',
          name: 'Musical Instrument',
        };
      } else {
        previousTraveler = traveler;
      }
    });
  }

  getAllSelectedSeats(): string[] {
    const seatNumbers: string[] = [];
    let i = 0;

    while (i < this.selectedSeatsArr.length) {
      const selectedSeat = this.selectedSeatsArr[i];
      if (selectedSeat && selectedSeat.seat) {
        seatNumbers.push(selectedSeat.seat.seatNum);
      }
      // Increment logic
      if (selectedSeat.seat.seatNum) {
        i++;
      }
    }

    return seatNumbers;
  }

  ngOnInit(): void {
    log.debug('Received @Input `travelers`:', this.travelers);
    this.findExtraSeats();
  }

  trackByTravelerId(_index: number, traveler: any): string {
    return `${traveler?.name?.first}-${traveler?.name?.last}-${traveler?.index}`;
  }
}
