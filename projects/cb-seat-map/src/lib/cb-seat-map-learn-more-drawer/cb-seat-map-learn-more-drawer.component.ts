import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  JbButtonModule,
  JbDrawerComponent,
  JbDrawerModule,
  JbIconModule,
} from 'jb-component-library';

import {
  CbSeatTypeEnum,
  type CmsContent,
  type LearnMorePanelDetails,
} from '../cb-seat-map/cb-seat-map.types';

@Component({
  selector: 'cb-seat-map-learn-more-drawer',
  templateUrl: './cb-seat-map-learn-more-drawer.component.html',
  styleUrls: ['./cb-seat-map-learn-more-drawer.component.scss'],
  standalone: true,
  imports: [JbIconModule, JbButtonModule, JbDrawerModule],
})
export class CbSeatMapLearnMoreDrawerComponent {
  @ViewChild('drawer') drawer: JbDrawerComponent;

  @Input() cmsEvenMore: CmsContent;
  @Input() cmsCommonText: CmsContent;
  @Input() cmsEms: CmsContent;
  @Input('onLearnMorePanelClick') set expand(details: LearnMorePanelDetails) {
    this.learnMorePanelDetails.seatType = details?.seatType;
    if (details?.isOpen) {
      this.drawer?.open();
    }
  }

  @Output() modelEmit = new EventEmitter<LearnMorePanelDetails>();

  labels = CbSeatTypeEnum;
  learnMorePanelDetails: LearnMorePanelDetails = {
    seatType: CbSeatTypeEnum.EM,
    isOpen: false,
  };

  closeModal(seatType: CbSeatTypeEnum) {
    this.learnMorePanelDetails.seatType = seatType;
    this.learnMorePanelDetails.isOpen = false;
    this.modelEmit.emit(this.learnMorePanelDetails);
  }

  get learnMoreDetails() {
    if (this.cmsEvenMore) {
      let content;

      if (this.learnMorePanelDetails.seatType === this.labels.CORE) {
        content = {
          detail: this.cmsEvenMore?.coreBenefitDetail,
          list: this.cmsEvenMore?.coreBenefits.map(
            (listitem) => listitem.benefit
          ),
          title: this.cmsCommonText?.jetBlueExperience,
          drawerHeaderImg: this.cmsEms.coreDrawerImg,
          drawerAltImg: this.cmsEvenMore.coreDrawerImgAlt,
        };
        return content;
      }
      content = {
        detail: this.cmsEvenMore?.emBenefitDetail,
        list: this.cmsEvenMore?.emBenefits.map((listitem) => listitem.benefit),
        title: this.cmsCommonText?.evenMore,
        emDetail: this.cmsEvenMore?.emDetail,
        emList: this.cmsEvenMore?.emBDetails.map(
          (listitem) => listitem.emDetails
        ),
        drawerHeaderImg: this.cmsEms?.emsDrawerImg,
        drawerAltImg: this.cmsEvenMore?.emDrawerImgAlt,
      };
      return content;
    }
    return '';
  }

  trackByFootNoteId(_index: number, footNote: CmsContent): string {
    return footNote?.footNote;
  }

  trackByListItem(_index: number, item: string): string {
    return item;
  }
}
