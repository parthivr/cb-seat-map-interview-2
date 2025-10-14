import { Component, Input, isDevMode } from '@angular/core';
import { JbButtonModule, JbIconModule } from 'jb-component-library';

import { HeadsUpDetailEnum } from './cb-seat-map-heads-up-panel.const';
import { JbEnums } from '../internal/jb-enums.const';
import { HeadsUpMessage } from './cb-seat-map-heads-up-panel.type';

@Component({
  selector: 'cb-seat-map-heads-up-panel',
  templateUrl: './cb-seat-map-heads-up-panel.component.html',
  standalone: true,
  imports: [
    JbIconModule,
    JbButtonModule,
  ],
})
export class CbSeatMapHeadsUpPanelComponent {
  private _content: HeadsUpMessage[];
  private _headsUpMessage: HeadsUpDetailEnum;

  @Input() set headsUpMessage(headsUpMessage: HeadsUpDetailEnum) {
    this._headsUpMessage = headsUpMessage;
    this.initMessage();
  }
  @Input() set content(content: HeadsUpMessage[]) {
    this._content = content;
    this.initMessage();
  }

  message: HeadsUpMessage | undefined;
  isShow = true;
  JbEnums = JbEnums;

  private initMessage(): void {
    this.message = this._content?.find(it => it.code === this._headsUpMessage);
  }

  get showCloseButton(): boolean {
    return !(this.headsUpMessage === HeadsUpDetailEnum.MINT_CABIN_UNAVAILABLE);
  }

  get headsUpIcon(): string {
    const relativeAircraftImagePath = `assets/resp-booking-icons/headsUpIcon.svg`;
    return isDevMode()
      ? `https://www-dev2.jetblue.com/booking/${relativeAircraftImagePath}`
      : relativeAircraftImagePath;
  }

  closeModal() {
    this.isShow = false;
  }
}
