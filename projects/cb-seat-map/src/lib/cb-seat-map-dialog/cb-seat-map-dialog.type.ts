import { Observable } from 'rxjs';
import { JbDialogVariantTypeEnum } from '../internal/jb-enums.const';

export interface DialogBox {
  dialogType: JbDialogVariantTypeEnum;
  id?: string;
  title?: string;
  content?: string | Observable<string>;
  primaryButton?: string;
}
