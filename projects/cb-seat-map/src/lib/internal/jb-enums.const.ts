import {
  JbAlignmentEnum,
  JbAvatarSizeEnum,
  JbBorderSizeEnum,
  JbButtonSizeEnum,
  JbButtonTypeEnum,
  JbCartIndicatorSizeEnum,
  JbCartIndicatorStateEnum,
  JbChevronIconSizeEnum,
  JbChevronTypeEnum,
  JbDialogHeaderHeightEnum,
  JbFlagCornerPosition,
  JbFlagTheme,
  JbFlipboardSizeEnum,
  JbFlyoutPlacementEnum,
  JbInputType,
  JbOfferBlockValueTypeEnum,
  JbOptionSettingsDisplayTypeEnum,
  JbOrientationEnum,
  JbPaginatorDirectionEnum,
  JbPromoBlockAccentColorEnum,
  JbPromoBlockCardSize,
  JbPromoBlockVAlignment,
  JbPromoCardTypeEnum,
  JbSeatState,
  JbSeatType,
  JbTableSortingDirectionEnum,
  JbThemeEnum,
  JbTileTrackerTileSizeEnum,
  JbVariantTypeEnum,
  JbVerticalAlignmentEnum,
  KeyboardKey,
} from 'jb-component-library';

// Note: As of `jb-component-library@29.0.0`, the following enums are not
// correctly exported from `public-api.d.ts` in the library. They are recreated
// and exported here so the templates can use them and can be removed once the
// component library is updated.
//
// import { CloseButtonFill } from 'jb-component-library/jb-close-button/types/jb-close-button-color.enum';
// import { CloseButtonSize } from 'jb-component-library/jb-close-button/types/jb-close-button-size.enum';
// import { JbDialogVariantTypeEnum } from 'jb-component-library/types/jb-dialog-variant-type.enum';
// import { JbSelectTypeEnum } from 'jb-component-library/types/jb-select-type.enum';

export enum CloseButtonFill {
  BLUE = 'core-blue',
  WHITE = 'white',
}

export enum CloseButtonSize {
  LARGE = 'large',
  SMALL = 'small',
}

export enum JbDialogVariantTypeEnum {
  content = 'content',
  notification = 'notification',
}

export enum JbSelectTypeEnum {
  simple = 'simple',
  standard = 'standard',
}

export const JbEnums = {
  CloseButtonFill,
  CloseButtonSize,
  JbAlignmentEnum,
  JbAvatarSizeEnum,
  JbBorderSizeEnum,
  JbButtonSizeEnum,
  JbButtonTypeEnum,
  JbCartIndicatorSizeEnum,
  JbCartIndicatorStateEnum,
  JbChevronIconSizeEnum,
  JbChevronTypeEnum,
  JbDialogHeaderHeightEnum,
  JbDialogVariantTypeEnum,
  JbFlagCornerPosition,
  JbFlagTheme,
  JbFlipboardSizeEnum,
  JbFlyoutPlacementEnum,
  JbInputType,
  JbOfferBlockValueTypeEnum,
  JbOptionSettingsDisplayTypeEnum,
  JbOrientationEnum,
  JbPaginatorDirectionEnum,
  JbPromoBlockAccentColorEnum,
  JbPromoBlockCardSize,
  JbPromoBlockVAlignment,
  JbPromoCardTypeEnum,
  JbSeatState,
  JbSeatType,
  JbSelectTypeEnum,
  JbTableSortingDirectionEnum,
  JbThemeEnum,
  JbTileTrackerTileSizeEnum,
  JbVariantTypeEnum,
  JbVerticalAlignmentEnum,
  KeyboardKey,
} as const;
