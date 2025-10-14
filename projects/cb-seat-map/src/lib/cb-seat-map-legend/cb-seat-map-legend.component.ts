import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  type OnInit,
} from '@angular/core';
import {
  JbAccordionModule,
  JbExpansionPanelModule,
  JbSeatModule,
} from 'jb-component-library';

import { CbSeatMapHeadsUpPanelComponent } from '../cb-seat-map-heads-up-panel/cb-seat-map-heads-up-panel.component';
import { HeadsUpDetailEnum } from '../cb-seat-map-heads-up-panel/cb-seat-map-heads-up-panel.const';
import {
  CbSeatTypeEnum,
  type CmsContent,
  type LearnMorePanelDetails,
} from '../cb-seat-map/cb-seat-map.types';
import { JbEnums } from '../internal/jb-enums.const';

@Component({
  selector: 'cb-seat-map-legend',
  templateUrl: './cb-seat-map-legend.component.html',
  styleUrls: ['./cb-seat-map-legend.component.scss'],
  standalone: true,
  imports: [
    CbSeatMapHeadsUpPanelComponent,
    CommonModule,
    JbAccordionModule,
    JbExpansionPanelModule,
    JbSeatModule,
  ],
})
export class CbSeatMapLegendComponent implements OnInit {
  @Input() isMint: boolean;
  @Input() isUMNR: boolean;
  @Input() cmsCommonText: CmsContent;
  @Input() cmsEms: CmsContent;
  @Input() cmsEvenMore: CmsContent;
  @Input() cmsHeadsUpPage: CmsContent;
  @Input() cmsMint: CmsContent;

  @Output() modelEmit = new EventEmitter<LearnMorePanelDetails>();

  seatSelectionData: any;
  JbEnums = JbEnums;
  headsUpMessage: HeadsUpDetailEnum | null;
  labels = CbSeatTypeEnum;
  learnMorePanelDetails: LearnMorePanelDetails = {
    seatType: CbSeatTypeEnum.EM,
    isOpen: false,
    from: 'learnMore',
  };

  ngOnInit(): void {
    this.headsUpMessage = this.getHeadsUpMessage();
  }

  private getHeadsUpMessage(): HeadsUpDetailEnum | null {
    if (this.isUMNR) {
      return HeadsUpDetailEnum.UMNR_SEAT;
    }
    return null;
  }

  getSeatDescription(seatType: any): string {
    let description = '';

    if (seatType === CbSeatTypeEnum.EM) {
      description = this.cmsEvenMore.seat.description || 'Even More Space';
    } else if (seatType === CbSeatTypeEnum.MINT) {
      description = this.cmsMint.seat.description || 'Mint';
    } else if (seatType === CbSeatTypeEnum.CORE) {
      description = this.cmsCommonText.seat.description || 'Core';
    } else {
      description = 'Standard Seat';
    }

    return description;
  }

  handleKeyPressEvent($event: KeyboardEvent, label: CbSeatTypeEnum): void {
    if ($event.code === JbEnums.KeyboardKey.Enter) {
      this.openLearnMorePanel(label);
    }
  }

  openLearnMorePanel(seatType: CbSeatTypeEnum) {
    this.learnMorePanelDetails.seatType = seatType;
    this.learnMorePanelDetails.isOpen = true;
    this.modelEmit.emit(this.learnMorePanelDetails);
  }

  trackByCmsData(_index: number, cmsData: CmsContent): string {
    return cmsData?.description;
  }
}
