import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  JbButtonModule,
  JbConfettiDirective,
  JbConfettiModule,
  JbIconModule,
  JbToolbarModule,
} from 'jb-component-library';

import cbSeatMapPackageJson from '../../../cb-seat-map/package.json';
import { mockRoundtripLayover2Adults2Children2InfantsCbSeatMapResponse } from '../../../cb-seat-map/src/lib/__mocks__/cb-seat-map-response.mock';
import { mockRoundTrip2AdultsSeatsSelected } from '../../../cb-seat-map/src/lib/__mocks__/cb-seat-map-seats-selected.mock';
import { CbSeatMapComponent } from '../../../cb-seat-map/src/lib/cb-seat-map/cb-seat-map.component';
import type { CbSeatSelectionData } from '../../../cb-seat-map/src/lib/cb-seat-map/cb-seat-map.types';
import { JbEnums } from '../../../cb-seat-map/src/lib/internal/jb-enums.const';

@Component({
  selector: 'cb-seat-map-demo',
  standalone: true,
  imports: [
    CbSeatMapComponent,
    CommonModule,
    JbButtonModule,
    JbConfettiModule,
    JbIconModule,
    JbToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cbSeatMapVersion = cbSeatMapPackageJson.version;
  isPreviewMode = false;
  JbEnums = JbEnums;
  seatData = mockRoundtripLayover2Adults2Children2InfantsCbSeatMapResponse;
  seatSelectedData = mockRoundTrip2AdultsSeatsSelected;

  @ViewChild(JbConfettiDirective) jbConfettiDirective: JbConfettiDirective;

  onSelectedSeats(selectedSeats: CbSeatSelectionData[]) {
    console.log('[cb-seat-map-demo] onSelectedSeats:', selectedSeats);
    this.jbConfettiDirective.confetti();
  }
}
