import {
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IS_BROWSER, JbButtonModule, JbDialogModule, JbDialogService } from "jb-component-library";
import { Subject } from 'rxjs';

import { DialogBox } from './cb-seat-map-dialog.type';
import { CommonModule } from '@angular/common';
import { JbEnums } from '../internal/jb-enums.const';

@Component({
  imports: [
    CommonModule,
    JbButtonModule,
    JbDialogModule,
  ],
  selector: 'cb-seat-map-dialog',
  templateUrl: './cb-seat-map-dialog.component.html',
  standalone: true,
})

export class CbSeatMapDialogComponent implements OnInit, OnDestroy {
  private readonly dialogService = inject(
    JbDialogService
  );
  private readonly isBrowser = inject(IS_BROWSER);
  dialogData: DialogBox;
  isAccepted$ = new Subject<boolean>();
  JbEnums = JbEnums;

  constructor() {}

  ngOnInit() {
    if (this.isBrowser) {
      this.dialogData = this.dialogService.getComponentReference().data;
    }
  }

  handleAcceptButton() {
    const dialogInstance = this.dialogService.getComponentReference();
    dialogInstance.isAccepted$.next(true);
    this.dialogService.closeDialog();
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.dialogService.getComponentReference().data = undefined;
    }
  }
}
